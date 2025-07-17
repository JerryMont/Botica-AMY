<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Venta;
use App\Models\DetalleVenta;
use App\Http\Requests\StoreVentaRequest;
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
            $venta = Venta::create([
                'fecha' => $data['fecha'],
                'total' => $data['total'],
                'cliente_id' => $data['cliente_id'],
                'usuario_id' => $data['usuario_id'],
            ]);
            foreach ($data['detalles'] as $detalle) {
                DetalleVenta::create([
                    'id_venta' => $venta->id_venta,
                    'id_producto' => $detalle['id_producto'],
                    'cantidad' => $detalle['cantidad'],
                    'precio_unitario' => $detalle['precio_unitario'],
                ]);
            }
            DB::commit();
            return response()->json([
                'status' => true,
                'message' => 'Venta creada correctamente',
                'data' => $venta->load(['cliente', 'usuario', 'detalles.producto'])
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
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

    public function destroy($id)
    {
        $venta = Venta::find($id);
        if (!$venta) {
            return response()->json([
                'status' => false,
                'message' => 'Venta no encontrada',
                'data' => null
            ], 404);
        }
        $venta->detalles()->delete();
        $venta->delete();
        return response()->json([
            'status' => true,
            'message' => 'Venta eliminada correctamente',
            'data' => null
        ]);
    }
} 