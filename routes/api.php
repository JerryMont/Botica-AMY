<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\ProductoController;
use App\Http\Controllers\Api\ServicioController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\MovimientoStockController;
use App\Http\Controllers\Api\CategoriaProductoController;
use App\Http\Controllers\Api\ReporteController;

// Rutas de autenticación (públicas)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']); // Logout sin requerir autenticación para evitar problemas

Route::middleware([\App\Http\Middleware\HandleSanctumToken::class, \App\Http\Middleware\AuthenticateUser::class])->group(function () {
    // Usuarios (solo admin)
    Route::apiResource('usuarios', UsuarioController::class)->middleware(\App\Http\Middleware\RolMiddleware::class . ':admin');

    // Clientes
    Route::apiResource('clientes', ClienteController::class);

    // Productos
    // Ruta específica para stock-bajo debe ir antes del resource para evitar
    // que 'stock-bajo' sea interpretado como {producto} por la ruta resource.
    Route::get('/productos/stock-bajo', [ProductoController::class, 'stockBajo']);
    Route::apiResource('productos', ProductoController::class);

    // Servicios
    Route::apiResource('servicios', ServicioController::class);

    // Ventas
    Route::apiResource('ventas', VentaController::class)->except(['update']);

    // Movimientos de stock
    Route::apiResource('movimientos-stock', MovimientoStockController::class)->except(['update']);

    // Categorías de productos
    Route::apiResource('categorias-producto', CategoriaProductoController::class);

    // Reportes
    Route::get('/reporte/ventas', [ReporteController::class, 'ventas']);
    Route::get('/reporte/dashboard', [ReporteController::class, 'dashboard']);

    // Ejemplo: solo admin puede acceder
    Route::get('/solo-admin', function () {
        return response()->json(['status' => true, 'message' => 'Solo admin', 'data' => null]);
    })->middleware(\App\Http\Middleware\RolMiddleware::class . ':admin');

    // Ejemplo: solo vendedor puede acceder
    Route::get('/solo-vendedor', function () {
        return response()->json(['status' => true, 'message' => 'Solo vendedor', 'data' => null]);
    })->middleware(\App\Http\Middleware\RolMiddleware::class . ':vendedor');
}); 