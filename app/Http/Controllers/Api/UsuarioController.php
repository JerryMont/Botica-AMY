<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de usuarios',
            'data' => $usuarios
        ]);
    }

    public function store(StoreUsuarioRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $usuario = Usuario::create($data);
        return response()->json([
            'status' => true,
            'message' => 'Usuario creado correctamente',
            'data' => $usuario
        ], 201);
    }

    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json([
                'status' => false,
                'message' => 'Usuario no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Usuario encontrado',
            'data' => $usuario
        ]);
    }

    public function update(UpdateUsuarioRequest $request, $id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json([
                'status' => false,
                'message' => 'Usuario no encontrado',
                'data' => null
            ], 404);
        }
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
        $usuario->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Usuario actualizado correctamente',
            'data' => $usuario
        ]);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json([
                'status' => false,
                'message' => 'Usuario no encontrado',
                'data' => null
            ], 404);
        }
        $usuario->delete();
        return response()->json([
            'status' => true,
            'message' => 'Usuario eliminado correctamente',
            'data' => null
        ]);
    }
} 