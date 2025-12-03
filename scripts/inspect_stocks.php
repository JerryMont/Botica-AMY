<?php
// Script para inspeccionar movimientos y totales por producto
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    // Conteos generales
    $totalProductos = DB::table('productos')->count();
    $totalMovimientos = DB::table('movimiento_stocks')->count();

    echo "Total productos: {$totalProductos}\n";
    echo "Total movimientos: {$totalMovimientos}\n\n";

    // Suma total por producto
    $sums = DB::select("SELECT id_producto, COALESCE(SUM(CASE WHEN tipo='entrada' THEN cantidad WHEN tipo='salida' THEN -cantidad ELSE 0 END),0) AS total_mov FROM movimiento_stocks GROUP BY id_producto ORDER BY total_mov ASC LIMIT 20");
    echo "Suma (entrada - salida) por producto (muestra hasta 20):\n";
    foreach ($sums as $row) {
        echo "id_producto={$row->id_producto} total_mov={$row->total_mov}\n";
    }

    echo "\nProductos y stock actual (muestra hasta 20):\n";
    $prods = DB::select('SELECT id_producto, nombre_producto, stock FROM productos ORDER BY id_producto ASC LIMIT 20');
    foreach ($prods as $p) {
        echo "id_producto={$p->id_producto} nombre=\"{$p->nombre_producto}\" stock={$p->stock}\n";
    }

    // Mostrar últimos movimientos
    echo "\nÚltimos 20 movimientos:\n";
    $movs = DB::select('SELECT id_movimiento, id_producto, tipo, cantidad, fecha FROM movimiento_stocks ORDER BY fecha DESC LIMIT 20');
    foreach ($movs as $m) {
        echo "id_mov={$m->id_movimiento} id_prod={$m->id_producto} tipo={$m->tipo} cantidad={$m->cantidad} fecha={$m->fecha}\n";
    }

    exit(0);
} catch (Throwable $e) {
    fwrite(STDERR, "ERROR: " . $e->getMessage() . "\n");
    exit(2);
}
