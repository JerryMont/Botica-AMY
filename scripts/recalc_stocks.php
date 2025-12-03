<?php
// script para recalcular stocks desde movimientos
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    $force = in_array('--force', $argv);

    // Hacer backup de los stocks actuales
    $now = date('Ymd_His');
    $backupPath = __DIR__ . "/../storage/app/stocks_backup_{$now}.json";
    @mkdir(dirname($backupPath), 0755, true);
    $current = DB::select('SELECT id_producto, nombre_producto, stock FROM productos');
    file_put_contents($backupPath, json_encode($current, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if ($force) {
        // Comportamiento original: actualizar todos los productos (por defecto pone 0 cuando no hay movimientos)
        $sql = "UPDATE productos p LEFT JOIN ( SELECT id_producto, COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN cantidad WHEN tipo = 'salida' THEN -cantidad ELSE 0 END), 0) AS total FROM movimiento_stocks GROUP BY id_producto ) m ON m.id_producto = p.id_producto SET p.stock = GREATEST(COALESCE(m.total, 0), 0);";
        DB::statement($sql);
        echo "OK: stocks recalculados (modo FORCE). Backup en: {$backupPath}\n";
        exit(0);
    }

    // Modo por defecto: solo actualizar productos que aparezcan en movimiento_stocks
    $sql = "UPDATE productos p INNER JOIN ( SELECT id_producto, COALESCE(SUM(CASE WHEN tipo = 'entrada' THEN cantidad WHEN tipo = 'salida' THEN -cantidad ELSE 0 END), 0) AS total FROM movimiento_stocks GROUP BY id_producto ) m ON m.id_producto = p.id_producto SET p.stock = GREATEST(m.total, 0);";
    DB::statement($sql);
    echo "OK: stocks recalculados (solo productos con movimientos). Backup en: {$backupPath}\n";
    exit(0);
} catch (Throwable $e) {
    fwrite(STDERR, "ERROR: " . $e->getMessage() . "\n");
    exit(2);
}
