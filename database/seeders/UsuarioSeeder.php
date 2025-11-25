<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        // Antes: aquí se creaban usuarios con credenciales hardcodeadas.
        // Eliminamos esas credenciales del código fuente por seguridad.
        // Opciones seguras para crear usuarios de prueba:
        // 1) Usar variables en el archivo `.env` y solo crear si existen.
        // 2) Ejecutar un seeder temporal/manual en desarrollo cuando sea necesario.

        $adminUser = env('SEED_ADMIN_USER');
        $adminPass = env('SEED_ADMIN_PASS');
        if ($adminUser && $adminPass) {
            \App\Models\Usuario::updateOrCreate(
                ['nombre_usuario' => $adminUser],
                [
                    'password' => \Illuminate\Support\Facades\Hash::make($adminPass),
                    'rol' => 'admin',
                    'activo' => true,
                ]
            );
        }

        $vendUser = env('SEED_VENDOR_USER');
        $vendPass = env('SEED_VENDOR_PASS');
        if ($vendUser && $vendPass) {
            \App\Models\Usuario::updateOrCreate(
                ['nombre_usuario' => $vendUser],
                [
                    'password' => \Illuminate\Support\Facades\Hash::make($vendPass),
                    'rol' => 'vendedor',
                    'activo' => true,
                ]
            );
        }
    }
} 