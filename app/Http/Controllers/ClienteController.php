<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Cliente;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $clientes = Cliente::query();

        if ($search) {
            $clientes->where(function($query) use ($search) {
                $query->where('nombre', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $clientes = $clientes->paginate(8);

        return view('clientes.index', compact('clientes', 'search'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('clientes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:clientes,email',
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:500',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        Cliente::create($request->all());

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente creado exitosamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        return view('clientes.show', compact('cliente'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        return view('clientes.edit', compact('cliente'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:clientes,email,'.$cliente->id_cliente,
            'telefono' => 'nullable|string|max:20',
            'direccion' => 'nullable|string|max:500',
            'activo' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $data = $request->all();

        // Manejar fecha_inactividad
        if ($data['activo'] == 0 && $cliente->activo == 1) {
            $data['fecha_inactividad'] = now();
        } elseif ($data['activo'] == 1 && $cliente->activo == 0) {
            $data['fecha_inactividad'] = null;
        }

        $cliente->update($data);

        return redirect()->route('clientes.index')->with('success', 'Cliente actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente eliminado exitosamente');
    }

    /**
     * Export clients to CSV.
     */
    public function export(): StreamedResponse
    {
        $clientes = Cliente::all();

        $filename = 'clientes_' . date('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($clientes) {
            $file = fopen('php://output', 'w');

            // Headers
            fputcsv($file, ['ID', 'Nombre', 'Email', 'Teléfono', 'Dirección']);

            // Data
            foreach ($clientes as $cliente) {
                fputcsv($file, [
                    $cliente->id_cliente,
                    $cliente->nombre,
                    $cliente->email,
                    $cliente->telefono ?? '',
                    $cliente->direccion ?? ''
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
} 