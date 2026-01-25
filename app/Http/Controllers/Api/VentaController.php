<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Models\Producto;
use App\Models\MovimientoStock;
use App\Http\Requests\StoreVentaRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VentaController extends Controller
{
    public function index()
    {
        $ventas = Venta::with(['cliente', 'usuario', 'detalles.producto'])->get();
        return response()->json([
            'status' => true,
            'message' => 'Lista de ventas',
            'data' => $ventas
        ]);
    }

    public function store(StoreVentaRequest $request)
    {
        Log::info('Datos recibidos en VentaController@store', $request->all());
        $data = $request->validated();
        DB::beginTransaction();
        try {
            // Validar stock suficiente antes de crear la venta
            foreach ($data['detalles'] as $detalle) {
                $producto = Producto::find($detalle['id_producto']);
                if (!$producto) {
                    DB::rollBack();
                    return response()->json([
                        'status' => false,
                        'message' => "Producto con ID {$detalle['id_producto']} no encontrado",
                        'data' => null
                    ], 404);
                }
                
                if ($producto->stock < $detalle['cantidad']) {
                    DB::rollBack();
                    return response()->json([
                        'status' => false,
                        'message' => "Stock insuficiente para el producto: {$producto->nombre_producto}. Stock disponible: {$producto->stock}, solicitado: {$detalle['cantidad']}",
                        'data' => null
                    ], 400);
                }
            }
            
            // Crear la venta
            $venta = Venta::create([
                'fecha' => $data['fecha'],
                'total' => $data['total'],
                'cliente_id' => $data['cliente_id'],
                'usuario_id' => $data['usuario_id'],
            ]);
            
            // Crear detalles y actualizar stock
            foreach ($data['detalles'] as $detalle) {
                $producto = Producto::find($detalle['id_producto']);
                
                // Crear detalle de venta
                DetalleVenta::create([
                    'id_venta' => $venta->id_venta,
                    'id_producto' => $detalle['id_producto'],
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario'],
                ]);
                
                // Actualizar stock del producto
                $producto->stock -= $detalle['cantidad'];
                $producto->save();
                
                // Registrar movimiento de stock
                MovimientoStock::create([
                    'id_producto' => $detalle['id_producto'],
                    'tipo' => 'salida',
                    'cantidad' => $detalle['cantidad'],
                    'fecha' => $data['fecha'],
                    'descripcion' => "Venta #{$venta->id_venta} - Producto: {$producto->nombre_producto}",
                ]);
            }
            
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Venta creada correctamente y stock actualizado',
                'data' => $venta->load(['cliente', 'usuario', 'detalles.producto'])
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al crear venta', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return response()->json([
                'status' => false,
                'message' => 'Error al crear la venta',
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $venta = Venta::with(['cliente', 'usuario', 'detalles.producto'])->find($id);
        if (!$venta) {
            return response()->json([
                'status' => false,
                'message' => 'Venta no encontrada',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Venta encontrada',
            'data' => $venta
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'estado' => 'required|in:completada,pendiente,cancelada'
        ]);

        DB::beginTransaction();
        try {
            $venta = Venta::with('detalles.producto')->find($id);
            if (!$venta) {
                return response()->json([
                    'status' => false,
                    'message' => 'Venta no encontrada',
                    'data' => null
                ], 404);
            }

            $estadoAnterior = $venta->estado;
            $nuevoEstado = $request->estado;

            // Si se cambia a cancelada y no estaba cancelada, restaurar stock
            if ($nuevoEstado === 'cancelada' && $estadoAnterior !== 'cancelada') {
                foreach ($venta->detalles as $detalle) {
                    $producto = $detalle->producto;
                    if ($producto) {
                        $producto->stock += $detalle->cantidad;
                        $producto->save();

                        // Registrar movimiento de devolución
                        MovimientoStock::create([
                            'id_producto' => $detalle->id_producto,
                            'tipo' => 'entrada',
                            'cantidad' => $detalle->cantidad,
                            'fecha' => date('Y-m-d H:i:s'),
                            'descripcion' => "Devolución por cancelación de Venta #{$venta->id_venta}",
                        ]);
                    }
                }
            }
            // Si se cambia de cancelada a otro estado, reducir stock nuevamente
            elseif ($estadoAnterior === 'cancelada' && $nuevoEstado !== 'cancelada') {
                foreach ($venta->detalles as $detalle) {
                    $producto = $detalle->producto;
                    if ($producto) {
                        $producto->stock -= $detalle->cantidad;
                        $producto->save();

                        // Registrar movimiento de salida
                        MovimientoStock::create([
                            'id_producto' => $detalle->id_producto,
                            'tipo' => 'salida',
                            'cantidad' => $detalle->cantidad,
                            'fecha' => date('Y-m-d H:i:s'),
                            'descripcion' => "Re-venta por cambio de estado Venta #{$venta->id_venta}",
                        ]);
                    }
                }
            }

            $venta->estado = $nuevoEstado;
            $venta->save();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Estado de venta actualizado correctamente',
                'data' => $venta->load(['cliente', 'usuario', 'detalles.producto'])
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar el estado: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $venta = Venta::with('detalles')->find($id);
            if (!$venta) {
                return response()->json([
                    'status' => false,
                    'message' => 'Venta no encontrada',
                    'data' => null
                ], 404);
            }

            // Restaurar stock
            foreach ($venta->detalles as $detalle) {
                $producto = Producto::find($detalle->id_producto);
                if ($producto) {
                    $producto->stock += $detalle->cantidad;
                    $producto->save();

                    // Registrar movimiento de devolución
                    MovimientoStock::create([
                        'id_producto' => $detalle->id_producto,
                        'tipo' => 'entrada',
                        'cantidad' => $detalle->cantidad,
                        'fecha' => date('Y-m-d H:i:s'),
                        'descripcion' => "Devolución por anulación de Venta #{$venta->id_venta}",
                    ]);
                }
            }

            $venta->detalles()->delete();
            $venta->delete();
            
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Venta eliminada y stock restaurado correctamente',
                'data' => null
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar la venta: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
} 