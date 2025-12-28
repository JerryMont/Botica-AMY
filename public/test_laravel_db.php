<?php
require_once '../vendor/autoload.php';
$app = require_once '../bootstrap/app.php';

try {
    $db = $app->make('db');
    $users = $db->select('SELECT * FROM usuarios LIMIT 1');
    echo "Conexión a DB exitosa con Laravel. Usuarios encontrados: " . count($users);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>