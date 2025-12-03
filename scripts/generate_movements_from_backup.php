<?php
// Genera movimientos (entradas/salidas) para restaurar stocks desde el backup creado por recalc_stocks.php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    // Buscar el backup más reciente
    $files = glob(__DIR__ . "/../storage/app/stocks_backup_*.json");
    if (empty($files)) {
        echo "ERROR: No se encontró backup en storage/app/stocks_backup_*.json\n";
        exit(2);
    }
    rsort($files);
    $backup = $files[0];
    $data = json_decode(file_get_contents($backup), true);
    if (!is_array($data)) {
        echo "ERROR: Backup inválido: {$backup}\n";
        exit(2);
    }

    $affected = [];
    DB::beginTransaction();
    foreach ($data as $row) {
        $id = $row['id_producto'] ?? null;
        $desired = isset($row['stock']) ? intval($row['stock']) : null;
        if (!$id || $desired === null) continue;

        // total actual en movimientos (entrada - salida)
        $sum = DB::table('movimiento_stocks')
            ->where('id_producto', $id)
            ->select(DB::raw("COALESCE(SUM(CASE WHEN tipo='entrada' THEN cantidad WHEN tipo='salida' THEN -cantidad ELSE 0 END),0) as total"))
            ->value('total');

        $sum = $sum === null ? 0 : intval($sum);
        $needed = $desired - $sum;
        if ($needed === 0) continue;

        $tipo = $needed > 0 ? 'entrada' : 'salida';
        $cantidad = abs($needed);

        DB::table('movimiento_stocks')->insert([
            'id_producto' => $id,
            'tipo' => $tipo,
            'cantidad' => $cantidad,
            'fecha' => date('Y-m-d H:i:s'),
        ]);

        $affected[] = $id;
        echo "Inserted movimiento: id_producto={$id} tipo={$tipo} cantidad={$cantidad}\n";
    }

    DB::commit();

    if (empty($affected)) {
        echo "No se insertaron movimientos (ya coinciden los totales).\n";
        exit(0);
    }

    // Recalcular stocks solo para productos afectados
    $ids = implode(',', array_unique($affected));
    $sql = "UPDATE productos p INNER JOIN ( SELECT id_producto, COALESCE(SUM(CASE WHEN tipo='entrada' THEN cantidad WHEN tipo='salida' THEN -cantidad ELSE 0 END), 0) AS total FROM movimiento_stocks WHERE id_producto IN ({$ids}) GROUP BY id_producto ) m ON m.id_producto = p.id_producto SET p.stock = GREATEST(m.total, 0) WHERE p.id_producto IN ({$ids});";
    DB::statement($sql);

    echo "Recalculo completado para productos: {$ids}\n";
    echo "Backup usado: {$backup}\n";
    exit(0);
} catch (Throwable $e) {
    DB::rollBack();
    fwrite(STDERR, "ERROR: " . $e->getMessage() . "\n");
    exit(2);
}
