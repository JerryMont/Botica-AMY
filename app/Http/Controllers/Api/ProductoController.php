<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Producto;
use App\Http\Requests\StoreProductoRequest;
use App\Http\Requests\UpdateProductoRequest;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json([
            'status' => true,
            'message' => 'Lista de productos',
            'data' => $productos
        ]);
    }

    public function store(StoreProductoRequest $request)
    {
        $producto = Producto::create($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Producto creado correctamente',
            'data' => $producto
        ], 201);
    }

    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }
        return response()->json([
            'status' => true,
            'message' => 'Producto encontrado',
            'data' => $producto
        ]);
    }

    public function update(UpdateProductoRequest $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }
        $producto->update($request->validated());
        return response()->json([
            'status' => true,
            'message' => 'Producto actualizado correctamente',
            'data' => $producto
        ]);
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json([
                'status' => false,
                'message' => 'Producto no encontrado',
                'data' => null
            ], 404);
        }
        $producto->delete();
        return response()->json([
            'status' => true,
            'message' => 'Producto eliminado correctamente',
            'data' => null
        ]);
    }

    /**
     * Obtener productos con stock bajo
     * GET /api/productos/stock-bajo?umbral=10
     */
    public function stockBajo(Request $request)
    {
        $umbral = $request->get('umbral', 10);
        
        $productos = Producto::where('stock', '<=', $umbral)
            ->orderBy('stock', 'asc')
            ->get();
        
        return response()->json([
            'status' => true,
            'message' => "Productos con stock menor o igual a {$umbral}",
            'data' => $productos,
            'meta' => [
                'umbral' => $umbral,
                'total' => $productos->count()
            ]
        ]);
    }
} 