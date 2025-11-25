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
        try {
            $cliente = Cliente::create($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Cliente creado correctamente',
                'data' => $cliente
            ], 201);
        } catch (\Illuminate\Database\QueryException $e) {
            // Error de base de datos (ej: email duplicado)
            $errorCode = $e->errorInfo[1] ?? null;
            if ($errorCode == 1062) { // Duplicate entry
                return response()->json([
                    'status' => false,
                    'message' => 'Este email ya está registrado. Por favor, use otro email',
                    'data' => null,
                    'errors' => ['email' => ['Este email ya está registrado']]
                ], 422);
            }
            return response()->json([
                'status' => false,
                'message' => 'Error al crear el cliente: ' . $e->getMessage(),
                'data' => null,
                'errors' => ['general' => [$e->getMessage()]]
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error inesperado al crear el cliente',
                'data' => null,
                'errors' => ['general' => [$e->getMessage()]]
            ], 500);
        }
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
        try {
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
                'data' => $cliente->fresh()
            ]);
        } catch (\Illuminate\Database\QueryException $e) {
            // Error de base de datos (ej: email duplicado)
            $errorCode = $e->errorInfo[1] ?? null;
            if ($errorCode == 1062) { // Duplicate entry
                return response()->json([
                    'status' => false,
                    'message' => 'Este email ya está registrado por otro cliente. Por favor, use otro email',
                    'data' => null,
                    'errors' => ['email' => ['Este email ya está registrado']]
                ], 422);
            }
            return response()->json([
                'status' => false,
                'message' => 'Error al actualizar el cliente: ' . $e->getMessage(),
                'data' => null,
                'errors' => ['general' => [$e->getMessage()]]
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error inesperado al actualizar el cliente',
                'data' => null,
                'errors' => ['general' => [$e->getMessage()]]
            ], 500);
        }
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