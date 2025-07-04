<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'nombre_usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        $usuario = Usuario::where('nombre_usuario', $request->nombre_usuario)->first();

        if (!$usuario) {
            Log::warning('Login fallido: usuario no encontrado', ['nombre_usuario' => $request->nombre_usuario]);
        } elseif (!Hash::check($request->password, $usuario->password)) {
            Log::warning('Login fallido: contraseña incorrecta', ['nombre_usuario' => $request->nombre_usuario]);
        } elseif (!$usuario->activo) {
            Log::warning('Login fallido: usuario inactivo', ['nombre_usuario' => $request->nombre_usuario]);
        }

        if (!$usuario || !Hash::check($request->password, $usuario->password) || !$usuario->activo) {
            return response()->json([
                'status' => false,
                'message' => 'Credenciales inválidas o usuario inactivo',
                'data' => null
            ], 401);
        }

        $token = $usuario->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login exitoso',
            'data' => [
                'usuario' => $usuario,
                'token' => $token
            ]
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logout exitoso',
            'data' => null
        ]);
    }
} 