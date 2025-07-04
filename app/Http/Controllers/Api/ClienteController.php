<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        $clientes = Cliente::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de clientes',
            'data' => $clientes
        ]);
    }

    public function store(StoreClienteRequest $request)
    {
        $cliente = Cliente::create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Cliente creado correctamente',
            'data' => $cliente
        ], 201);
    }

    public function show($id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json([
                'status' => false,
                'message' => 'Cliente no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Cliente encontrado',
            'data' => $cliente
        ]);
    }

    public function update(UpdateClienteRequest $request, $id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json([
                'status' => false,
                'message' => 'Cliente no encontrado',
                'data' => null
            ], 404);
        }
        $cliente->update($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Cliente actualizado correctamente',
            'data' => $cliente
        ]);
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        if (!$cliente) {
            return response()->json([
                'status' => false,
                'message' => 'Cliente no encontrado',
                'data' => null
            ], 404);
        }
        $cliente->delete();
        return response()->json([
            'status' => true,
            'message' => 'Cliente eliminado correctamente',
            'data' => null
        ]);
    }
} 