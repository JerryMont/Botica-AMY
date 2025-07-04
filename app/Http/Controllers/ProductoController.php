<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $productos = Producto::query();
        
        if ($search) {
            $productos->where('nombre_producto', 'like', "%{$search}%");
        }
        
        $productos = $productos->paginate(6);
        
        return view('productos.index', compact('productos', 'search'));
    }

    public function create()
    {
        return view('productos.create');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_producto' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Producto::create($request->all());
        
        return redirect()->route('productos.index')
            ->with('success', 'Producto creado exitosamente');
    }

    public function edit(Producto $producto)
    {
        return view('productos.edit', compact('producto'));
    }

    public function update(Request $request, Producto $producto)
    {
        $validator = Validator::make($request->all(), [
            'nombre_producto' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $producto->update($request->all());
        
        return redirect()->route('productos.index')
            ->with('success', 'Producto actualizado exitosamente');
    }

    public function destroy(Producto $producto)
    {
        $producto->delete();
        
        return redirect()->route('productos.index')
            ->with('success', 'Producto eliminado exitosamente');
    }

    public function exportCsv()
    {
        $productos = Producto::all();
        
        $filename = 'productos_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];
        
        $callback = function() use ($productos) {
            $file = fopen('php://output', 'w');
            
            // Headers
            fputcsv($file, ['ID', 'Nombre', 'Descripción', 'Precio', 'Stock']);
            
            // Data
            foreach ($productos as $producto) {
                fputcsv($file, [
                    $producto->id_producto,
                    $producto->nombre_producto,
                    $producto->descripcion ?? '',
                    $producto->precio,
                    $producto->stock
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }

    public function stockBajo(Request $request)
    {
        $umbral = $request->get('umbral', 10);
        $productos = Producto::where('stock', '<=', $umbral)->get();
        
        return response()->json([
            'data' => $productos
        ]);
    }
} 