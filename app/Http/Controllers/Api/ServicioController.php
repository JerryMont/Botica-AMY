<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use App\Http\Requests\StoreServicioRequest;
use App\Http\Requests\UpdateServicioRequest;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    public function index()
    {
        $servicios = Servicio::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de servicios',
            'data' => $servicios
        ]);
    }

    public function store(StoreServicioRequest $request)
    {
        $servicio = Servicio::create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Servicio creado correctamente',
            'data' => $servicio
        ], 201);
    }

    public function show($id)
    {
        $servicio = Servicio::find($id);
        if (!$servicio) {
            return response()->json([
                'status' => false,
                'message' => 'Servicio no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Servicio encontrado',
            'data' => $servicio
        ]);
    }

    public function update(UpdateServicioRequest $request, $id)
    {
        $servicio = Servicio::find($id);
        if (!$servicio) {
            return response()->json([
                'status' => false,
                'message' => 'Servicio no encontrado',
                'data' => null
            ], 404);
        }
        $servicio->update($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Servicio actualizado correctamente',
            'data' => $servicio
        ]);
    }

    public function destroy($id)
    {
        $servicio = Servicio::find($id);
        if (!$servicio) {
            return response()->json([
                'status' => false,
                'message' => 'Servicio no encontrado',
                'data' => null
            ], 404);
        }
        $servicio->delete();
        return response()->json([
            'status' => true,
            'message' => 'Servicio eliminado correctamente',
            'data' => null
        ]);
    }
} 