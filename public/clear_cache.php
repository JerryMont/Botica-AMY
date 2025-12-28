<?php
require_once '../vendor/autoload.php';
$app = require_once '../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

// Limpiar caches
$kernel->call('config:clear');
$kernel->call('cache:clear');
$kernel->call('route:clear');
$kernel->call('view:clear');

echo "Caches limpiados. Ahora prueba test_laravel_db.php de nuevo.";
?>