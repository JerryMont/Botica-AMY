<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\Cliente;
use App\Models\Venta;

class DashboardController extends Controller
{
    public function index()
    {
        // Obtener estadísticas para el dashboard
        $stats = [
            'totalProductos' => Producto::count(),
            'totalClientes' => Cliente::count(),
            'totalVentas' => Venta::count(),
            'stockBajo' => Producto::where('stock', '<=', 10)->count()
        ];

        return view('dashboard', compact('stats'));
    }
}
