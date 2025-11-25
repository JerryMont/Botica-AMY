<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use App\Models\Producto;
use App\Models\DetalleVenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReporteController extends Controller
{
    /**
     * Reporte de ventas por período
     * GET /api/reporte/ventas?fecha_inicio=2024-01-01&fecha_fin=2024-12-31
     */
    public function ventas(Request $request)
    {
        $fecha_inicio = $request->get('fecha_inicio', now()->startOfMonth()->toDateString());
        $fecha_fin = $request->get('fecha_fin', now()->endOfMonth()->toDateString());

        // Validar formato de fechas
        try {
            $fecha_inicio = \Carbon\Carbon::parse($fecha_inicio)->startOfDay();
            $fecha_fin = \Carbon\Carbon::parse($fecha_fin)->endOfDay();
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Formato de fecha inválido. Use formato YYYY-MM-DD',
                'data' => null
            ], 400);
        }

        // Obtener ventas en el período
        $ventas = Venta::whereBetween('fecha', [$fecha_inicio, $fecha_fin])
            ->with(['cliente', 'usuario', 'detalles.producto'])
            ->get();

        // Calcular estadísticas
        $total_ventas = $ventas->count();
        $monto_total = $ventas->sum('total');
        
        // Total de productos vendidos
        $total_productos_vendidos = DetalleVenta::whereHas('venta', function($query) use ($fecha_inicio, $fecha_fin) {
            $query->whereBetween('fecha', [$fecha_inicio, $fecha_fin]);
        })->sum('cantidad');

        // Detalle por producto
        $detalle_por_producto = DetalleVenta::whereHas('venta', function($query) use ($fecha_inicio, $fecha_fin) {
            $query->whereBetween('fecha', [$fecha_inicio, $fecha_fin]);
        })
        ->select('id_producto', DB::raw('SUM(cantidad) as total_cantidad'), DB::raw('SUM(cantidad * precio_unitario) as total_monto'))
        ->with('producto')
        ->groupBy('id_producto')
        ->get()
        ->map(function($item) {
            return [
                'id_producto' => $item->id_producto,
                'nombre_producto' => $item->producto->nombre_producto ?? 'N/A',
                'total_cantidad' => (int) $item->total_cantidad,
                'total_monto' => (float) $item->total_monto,
            ];
        });

        // Ventas por día
        $ventas_por_dia = Venta::whereBetween('fecha', [$fecha_inicio, $fecha_fin])
            ->select(DB::raw('DATE(fecha) as dia'), DB::raw('COUNT(*) as total'), DB::raw('SUM(total) as monto'))
            ->groupBy('dia')
            ->orderBy('dia')
            ->get();

        $reporte = [
            'fecha_inicio' => $fecha_inicio->toDateString(),
            'fecha_fin' => $fecha_fin->toDateString(),
            'total_ventas' => $total_ventas,
            'monto_total' => (float) $monto_total,
            'total_productos_vendidos' => (int) $total_productos_vendidos,
            'promedio_por_venta' => $total_ventas > 0 ? (float) ($monto_total / $total_ventas) : 0,
            'detalle_por_producto' => $detalle_por_producto,
            'ventas_por_dia' => $ventas_por_dia,
            'ventas' => $ventas,
        ];

        return response()->json([
            'status' => true,
            'message' => 'Reporte de ventas generado correctamente',
            'data' => $reporte
        ]);
    }

    /**
     * Dashboard con estadísticas generales
     * GET /api/reporte/dashboard
     */
    public function dashboard()
    {
        $hoy = now()->toDateString();
        $inicio_mes = now()->startOfMonth();
        $inicio_semana = now()->startOfWeek();
        $inicio_ano = now()->startOfYear();

        $stats = [
            // Estadísticas de hoy
            'hoy' => [
                'ventas' => Venta::whereDate('fecha', $hoy)->count(),
                'monto' => (float) Venta::whereDate('fecha', $hoy)->sum('total'),
            ],
            
            // Estadísticas de la semana
            'semana' => [
                'ventas' => Venta::where('fecha', '>=', $inicio_semana)->count(),
                'monto' => (float) Venta::where('fecha', '>=', $inicio_semana)->sum('total'),
            ],
            
            // Estadísticas del mes
            'mes' => [
                'ventas' => Venta::where('fecha', '>=', $inicio_mes)->count(),
                'monto' => (float) Venta::where('fecha', '>=', $inicio_mes)->sum('total'),
            ],
            
            // Estadísticas del año
            'ano' => [
                'ventas' => Venta::where('fecha', '>=', $inicio_ano)->count(),
                'monto' => (float) Venta::where('fecha', '>=', $inicio_ano)->sum('total'),
            ],
            
            // Estadísticas de productos
            'productos' => [
                'total' => Producto::count(),
                'stock_bajo' => Producto::where('stock', '<=', 10)->count(),
                'stock_critico' => Producto::where('stock', '<=', 5)->count(),
                'sin_stock' => Producto::where('stock', '=', 0)->count(),
            ],
            
            // Top 5 productos más vendidos (últimos 30 días)
            'productos_mas_vendidos' => DetalleVenta::whereHas('venta', function($query) {
                $query->where('fecha', '>=', now()->subDays(30));
            })
            ->select('id_producto', DB::raw('SUM(cantidad) as total_vendido'))
            ->with('producto')
            ->groupBy('id_producto')
            ->orderByDesc('total_vendido')
            ->limit(5)
            ->get()
            ->map(function($item) {
                return [
                    'id_producto' => $item->id_producto,
                    'nombre_producto' => $item->producto->nombre_producto ?? 'N/A',
                    'total_vendido' => (int) $item->total_vendido,
                ];
            }),
        ];

        return response()->json([
            'status' => true,
            'message' => 'Estadísticas del dashboard',
            'data' => $stats
        ]);
    }
}
