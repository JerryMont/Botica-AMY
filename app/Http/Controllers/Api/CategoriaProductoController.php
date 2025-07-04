<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoriaProducto;
use App\Http\Requests\StoreCategoriaProductoRequest;
use App\Http\Requests\UpdateCategoriaProductoRequest;
use Illuminate\Http\Request;

class CategoriaProductoController extends Controller
{
    public function index()
    {
        $categorias = CategoriaProducto::with('productos')->get();
        return response()->json([
            'status' => true,
            'message' => 'Lista de categorías de productos',
            'data' => $categorias
        ]);
    }

    public function store(StoreCategoriaProductoRequest $request)
    {
        $categoria = CategoriaProducto::create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Categoría creada correctamente',
            'data' => $categoria
        ], 201);
    }

    public function show($id)
    {
        $categoria = CategoriaProducto::with('productos')->find($id);
        if (!$categoria) {
            return response()->json([
                'status' => false,
                'message' => 'Categoría no encontrada',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Categoría encontrada',
            'data' => $categoria
        ]);
    }

    public function update(UpdateCategoriaProductoRequest $request, $id)
    {
        $categoria = CategoriaProducto::find($id);
        if (!$categoria) {
            return response()->json([
                'status' => false,
                'message' => 'Categoría no encontrada',
                'data' => null
            ], 404);
        }
        $categoria->update($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Categoría actualizada correctamente',
            'data' => $categoria
        ]);
    }

    public function destroy($id)
    {
        $categoria = CategoriaProducto::find($id);
        if (!$categoria) {
            return response()->json([
                'status' => false,
                'message' => 'Categoría no encontrada',
                'data' => null
            ], 404);
        }
        $categoria->delete();
        return response()->json([
            'status' => true,
            'message' => 'Categoría eliminada correctamente',
            'data' => null
        ]);
    }
} 