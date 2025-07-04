<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Cliente;
use App\Models\Producto;
use App\Models\DetalleVenta;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class VentaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $ventas = Venta::with(['cliente', 'usuario'])
            ->orderBy('fecha', 'desc');
        
        if ($search) {
            $ventas->where(function($query) use ($search) {
                $query->where('id_venta', 'like', "%{$search}%")
                      ->orWhereHas('cliente', function($q) use ($search) {
                          $q->where('nombre', 'like', "%{$search}%");
                      });
            });
        }
        
        $ventas = $ventas->paginate(6);
        
        return view('ventas.index', compact('ventas', 'search'));
    }

    public function create()
    {
        $clientes = Cliente::orderBy('nombre')->get();
        $productos = Producto::where('stock', '>', 0)->orderBy('nombre_producto')->get();
        
        return view('ventas.create', compact('clientes', 'productos'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cliente_id' => 'required|exists:clientes,id_cliente',
            'detalles' => 'required|array|min:1',
            'detalles.*.id_producto' => 'required|exists:productos,id_producto',
            'detalles.*.cantidad' => 'required|integer|min:1',
            'detalles.*.precio_unitario' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        DB::beginTransaction();
        try {
            // Calcular total
            $total = collect($request->detalles)->sum(function($detalle) {
                return $detalle['cantidad'] * $detalle['precio_unitario'];
            });

            // Crear venta
            $venta = Venta::create([
                'fecha' => now(),
                'total' => $total,
                'cliente_id' => $request->cliente_id,
                'usuario_id' => auth()->id() ?? 1
            ]);

            // Crear detalles de venta
            foreach ($request->detalles as $detalle) {
                DetalleVenta::create([
                    'id_venta' => $venta->id_venta,
                    'id_producto' => $detalle['id_producto'],
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario']
                ]);

                // Actualizar stock del producto
                $producto = Producto::find($detalle['id_producto']);
                $producto->decrement('stock', $detalle['cantidad']);
            }

            DB::commit();
            
            return redirect()->route('ventas.show', $venta)
                ->with('success', 'Venta registrada exitosamente');
                
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Error al registrar la venta: ' . $e->getMessage()])->withInput();
        }
    }

    public function show(Venta $venta)
    {
        $venta->load(['cliente', 'usuario', 'detalles.producto']);
        return view('ventas.show', compact('venta'));
    }

    public function destroy(Venta $venta)
    {
        DB::beginTransaction();
        try {
            // Restaurar stock de productos
            foreach ($venta->detalles as $detalle) {
                $producto = Producto::find($detalle->id_producto);
                $producto->increment('stock', $detalle->cantidad);
            }

            // Eliminar detalles y venta
            $venta->detalles()->delete();
            $venta->delete();

            DB::commit();
            
            return redirect()->route('ventas.index')
                ->with('success', 'Venta eliminada exitosamente');
                
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withErrors(['error' => 'Error al eliminar la venta: ' . $e->getMessage()]);
        }
    }

    public function export()
    {
        $ventas = Venta::with('cliente')->get();
        
        $filename = 'ventas_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];
        
        $callback = function() use ($ventas) {
            $file = fopen('php://output', 'w');
            
            // Headers
            fputcsv($file, ['ID Venta', 'Cliente', 'Total', 'Fecha', 'Usuario']);
            
            // Data
            foreach ($ventas as $venta) {
                fputcsv($file, [
                    $venta->id_venta,
                    $venta->cliente->nombre ?? 'N/A',
                    $venta->total,
                    Carbon::parse($venta->fecha)->format('d/m/Y'),
                    $venta->usuario->nombre_usuario ?? 'N/A'
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }
} 