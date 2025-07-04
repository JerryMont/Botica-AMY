<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\Usuario::updateOrCreate(
            ['nombre_usuario' => 'admin'],
            [
                'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
                'rol' => 'admin',
                'activo' => true,
            ]
        );

        \App\Models\Usuario::updateOrCreate(
            ['nombre_usuario' => 'vendedor'],
            [
                'password' => \Illuminate\Support\Facades\Hash::make('vendedor123'),
                'rol' => 'vendedor',
                'activo' => true,
            ]
        );
    }
} 