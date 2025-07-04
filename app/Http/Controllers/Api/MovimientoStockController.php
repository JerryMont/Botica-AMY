<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MovimientoStock;
use App\Http\Requests\StoreMovimientoStockRequest;
use Illuminate\Http\Request;

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
        $movimiento = MovimientoStock::create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Movimiento de stock creado correctamente',
            'data' => $movimiento
        ], 201);
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