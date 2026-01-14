<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\VentaController;

// Rutas de autenticación
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Rutas protegidas (comentadas para evitar conflicto con React)
// Route::middleware('auth')->group(function () {
//     Route::get('/', function () {
//         return redirect()->route('dashboard');
//     });

//     Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

//     // Rutas de clientes
//     Route::resource('clientes', ClienteController::class);
//     Route::get('/clientes/export/csv', [ClienteController::class, 'export'])->name('clientes.export');

//     // Rutas de productos
//     Route::resource('productos', ProductoController::class);
//     Route::get('/productos/export/csv', [ProductoController::class, 'exportCsv'])->name('productos.export');
//     Route::get('/productos/stock-bajo', [ProductoController::class, 'stockBajo'])->name('productos.stock-bajo');

//     // Rutas de reportes
//     Route::get('/reportes', [ReporteController::class, 'index'])->name('reportes.index');
//     Route::get('/reportes/ventas', [ReporteController::class, 'ventas'])->name('reportes.ventas');
//     Route::get('/reportes/stock', [ReporteController::class, 'stock'])->name('reportes.stock');
//     Route::get('/reportes/dashboard', [ReporteController::class, 'dashboard'])->name('reportes.dashboard');

//     // Rutas de servicios
//     Route::resource('servicios', ServicioController::class);

//     // Rutas de ventas
//     Route::resource('ventas', VentaController::class);
//     Route::get('/ventas/export/csv', [VentaController::class, 'export'])->name('ventas.export');
// });

// Catch-all para React (SPA)
Route::get('/{any}', function () {
    $indexPath = base_path('index.html');
    if (file_exists($indexPath)) {
        return file_get_contents($indexPath);
    }
    abort(404, 'Frontend not found');
})->where('any', '.*');


