<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\MovimientoStock;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de productos',
            'data' => $productos
        ]);
    }

    public function store(StoreProductoRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();
        try {
            $producto = Producto::create($data);

            // Si se proporcionó stock inicial, crear un movimiento de entrada para mantener el historial
            $stockInicial = isset($data['stock']) ? intval($data['stock']) : 0;
            if ($stockInicial > 0) {
                MovimientoStock::create([
                    'id_producto' => $producto->id_producto,
                    'tipo' => 'entrada',
                    'cantidad' => $stockInicial,
                    'fecha' => date('Y-m-d H:i:s'),
                    'descripcion' => 'Stock inicial al crear producto'
                ]);
                // Actualizar stock en el producto (aseguramos consistencia)
                $producto->stock = $stockInicial;
                $producto->save();
            }

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Producto creado correctamente',
                'data' => $producto
            ], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al crear producto: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Producto encontrado',
            'data' => $producto
        ]);
    }

    public function update(UpdateProductoRequest $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }
        $data = $request->validated();

        DB::beginTransaction();
        try {
            // Si se proporciona cambio en stock, generar movimiento correspondiente
            if (array_key_exists('stock', $data)) {
                $nuevoStock = intval($data['stock']);
                $diferencia = $nuevoStock - intval($producto->stock);
                if ($diferencia !== 0) {
                    $tipo = $diferencia > 0 ? 'entrada' : 'salida';
                    MovimientoStock::create([
                        'id_producto' => $producto->id_producto,
                        'tipo' => $tipo,
                        'cantidad' => abs($diferencia),
                        'fecha' => date('Y-m-d H:i:s'),
                        'descripcion' => 'Ajuste de stock por edición de producto'
                    ]);
                    // Actualizamos el stock en el producto
                    $producto->stock = $nuevoStock;
                }
            }

            // Actualizar otros campos
            $producto->fill($data);
            $producto->save();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Producto actualizado correctamente',
                'data' => $producto
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar producto: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }

        // Verificar si el producto tiene ventas asociadas (no se puede eliminar)
        $tieneVentas = $producto->detalleVentas()->exists();
        if ($tieneVentas) {
            return response()->json([
                'status' => false,
                'message' => 'No se puede eliminar el producto porque tiene ventas registradas asociadas.',
                'data' => null
            ], 422);
        }

        DB::beginTransaction();
        try {
            // Eliminar primero los movimientos de stock relacionados
            $producto->movimientosStock()->delete();

            // Ahora sí eliminar el producto
            $producto->delete();

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Producto eliminado correctamente',
                'data' => null
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al eliminar el producto: ' . $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Obtener productos con stock bajo
     * GET /api/productos/stock-bajo?umbral=10
     */
    public function stockBajo(Request $request)
    {
        $umbral = $request->get('umbral', 10);
        
        $productos = Producto::where('stock', '<=', $umbral)
            ->orderBy('stock', 'asc')
            ->get();
        
        return response()->json([
            'status' => true,
            'message' => "Productos con stock menor o igual a {$umbral}",
            'data' => $productos,
            'meta' => [
                'umbral' => $umbral,
                'total' => $productos->count()
            ]
        ]);
    }
} 