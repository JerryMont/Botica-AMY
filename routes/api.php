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

// Rutas de autenticación
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Usuarios (solo admin)
    Route::apiResource('usuarios', UsuarioController::class)->middleware('rol:admin');

    // Clientes
    Route::apiResource('clientes', ClienteController::class);

    // Productos
    Route::apiResource('productos', ProductoController::class);

    // Servicios
    Route::apiResource('servicios', ServicioController::class);

    // Ventas
    Route::apiResource('ventas', VentaController::class)->except(['update']);

    // Movimientos de stock
    Route::apiResource('movimientos-stock', MovimientoStockController::class)->except(['update']);

    // Categorías de productos
    Route::apiResource('categorias-producto', CategoriaProductoController::class);

    // Ejemplo: solo admin puede acceder
    Route::get('/solo-admin', function () {
        return response()->json(['status' => true, 'message' => 'Solo admin', 'data' => null]);
    })->middleware('rol:admin');

    // Ejemplo: solo vendedor puede acceder
    Route::get('/solo-vendedor', function () {
        return response()->json(['status' => true, 'message' => 'Solo vendedor', 'data' => null]);
    })->middleware('rol:vendedor');
}); 