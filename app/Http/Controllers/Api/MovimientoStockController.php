<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MovimientoStock;
use App\Http\Requests\StoreMovimientoStockRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Producto;

class MovimientoStockController extends Controller
{
    public function index()
    {
        $movimientos = MovimientoStock::with('producto')->get();
        return response()->json([
            'status' => true,
            'message' => 'Lista de movimientos de stock',
            'data' => $movimientos
        ]);
    }

    public function store(StoreMovimientoStockRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();
        try {
            $movimiento = MovimientoStock::create($data);

            // Actualizar stock en la tabla productos
            $producto = Producto::find($data['id_producto']);
            if ($producto) {
                if ($data['tipo'] === 'entrada') {
                    $producto->increment('stock', (int) $data['cantidad']);
                } else {
                    // evitar stock negativo
                    $decrement = (int) $data['cantidad'];
                    $nuevo = max(0, $producto->stock - $decrement);
                    $producto->stock = $nuevo;
                    $producto->save();
                }
            }

            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Movimiento de stock creado correctamente',
                'data' => $movimiento
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Error al crear movimiento de stock',
                'data' => null,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $movimiento = MovimientoStock::with('producto')->find($id);
        if (!$movimiento) {
            return response()->json([
                'status' => false,
                'message' => 'Movimiento de stock no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Movimiento de stock encontrado',
            'data' => $movimiento
        ]);
    }

    public function destroy($id)
    {
        $movimiento = MovimientoStock::find($id);
        if (!$movimiento) {
            return response()->json([
                'status' => false,
                'message' => 'Movimiento de stock no encontrado',
                'data' => null
            ], 404);
        }
        $movimiento->delete();
        return response()->json([
            'status' => true,
            'message' => 'Movimiento de stock eliminado correctamente',
            'data' => null
        ]);
    }
} 