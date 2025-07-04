<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReporteController extends Controller
{
    public function index()
    {
        return view('reportes.index');
    }

    public function ventas(Request $request)
    {
        $fecha_inicio = $request->get('fecha_inicio');
        $fecha_fin = $request->get('fecha_fin');

        if (!$fecha_inicio || !$fecha_fin) {
            return back()->withErrors(['error' => 'Las fechas son requeridas']);
        }

        // Convertir fechas a Carbon para mejor manejo
        $inicio = Carbon::parse($fecha_inicio)->startOfDay();
        $fin = Carbon::parse($fecha_fin)->endOfDay();

        // Obtener ventas en el rango de fechas
        $ventas = Venta::whereBetween('fecha', [$inicio, $fin])->get();

        // Calcular estadísticas
        $total_ventas = $ventas->count();
        $monto_total = $ventas->sum('total');
        
        // Obtener detalles de ventas
        $detalle_ventas = DetalleVenta::whereIn('venta_id', $ventas->pluck('id_venta'))
            ->with('producto')
            ->get();

        $total_productos_vendidos = $detalle_ventas->sum('cantidad');

        // Agrupar por producto
        $detalle_por_producto = $detalle_ventas->groupBy('id_producto')
            ->map(function ($items) {
                $producto = $items->first()->producto;
                return [
                    'id_producto' => $producto->id_producto,
                    'producto' => [
                        'nombre_producto' => $producto->nombre_producto
                    ],
                    'cantidad_vendida' => $items->sum('cantidad'),
                    'total_vendido' => $items->sum(DB::raw('cantidad * precio_unitario'))
                ];
            })
            ->values();

        $reporte = [
            'total_ventas' => $total_ventas,
            'total_productos_vendidos' => $total_productos_vendidos,
            'monto_total' => $monto_total,
            'detalle_por_producto' => $detalle_por_producto,
            'fecha_inicio' => $fecha_inicio,
            'fecha_fin' => $fecha_fin
        ];

        return view('reportes.ventas', compact('reporte'));
    }

    public function stock(Request $request)
    {
        $umbral = $request->get('umbral', 10);
        
        $productos = Producto::where('stock', '<=', $umbral)
            ->orderBy('stock', 'asc')
            ->get();

        return view('reportes.stock', compact('productos', 'umbral'));
    }

    public function dashboard()
    {
        // Estadísticas generales para el dashboard
        $stats = [
            'total_ventas_hoy' => Venta::whereDate('fecha', today())->count(),
            'monto_ventas_hoy' => Venta::whereDate('fecha', today())->sum('total'),
            'productos_stock_bajo' => Producto::where('stock', '<=', 10)->count(),
            'total_productos' => Producto::count(),
            'ventas_ultima_semana' => Venta::whereBetween('fecha', [
                now()->subWeek()->startOfDay(),
                now()->endOfDay()
            ])->count()
        ];

        return view('reportes.dashboard', compact('stats'));
    }
} 