<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Http\Requests\StoreUsuarioRequest;
use App\Http\Requests\UpdateUsuarioRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

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
        try {
            $data = $request->validated();

            // Garantizar default para 'activo' si no viene
            if (!array_key_exists('activo', $data)) {
                $data['activo'] = true;
            }

            if (empty($data['password'])) {
                return response()->json([
                    'status' => false,
                    'message' => 'La contraseña es obligatoria.',
                    'errors' => ['password' => ['La contraseña es obligatoria.']]
                ], 422);
            }

            $data['password'] = Hash::make($data['password']);

            DB::beginTransaction();
            try {
                $usuario = Usuario::create($data);
                DB::commit();
            } catch (QueryException $qe) {
                DB::rollBack();
                Log::error('Error al crear usuario (QueryException): ' . $qe->getMessage(), ['data' => $data]);
                return response()->json([
                    'status' => false,
                    'message' => 'Error de base de datos al crear el usuario.',
                    'error' => $qe->getMessage()
                ], 500);
            }

            return response()->json([
                'status' => true,
                'message' => 'Usuario creado correctamente',
                'data' => $usuario
            ], 201);

        } catch (ValidationException $ve) {
            return response()->json([
                'status' => false,
                'message' => 'Errores de validación',
                'errors' => $ve->errors()
            ], 422);
        } catch (\Exception $ex) {
            Log::error('Error inesperado al crear usuario: ' . $ex->getMessage(), ['trace' => $ex->getTraceAsString()]);
            return response()->json([
                'status' => false,
                'message' => 'Error inesperado al crear el usuario.'
            ], 500);
        }
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