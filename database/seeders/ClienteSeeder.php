<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        $clientes = [
            [
                'nombre' => 'Juan Pérez',
                'email' => 'juan.perez@example.com',
                'telefono' => '123-456-7890',
                'direccion' => 'Av. Principal 123, Ciudad',
                'activo' => true
            ],
            [
                'nombre' => 'María García',
                'email' => 'maria.garcia@example.com',
                'telefono' => '098-765-4321',
                'direccion' => 'Calle Secundaria 456, Pueblo',
                'activo' => true
            ],
            [
                'nombre' => 'Carlos López',
                'email' => 'carlos.lopez@example.com',
                'telefono' => '555-123-4567',
                'direccion' => 'Plaza Central 789, Villa',
                'activo' => true
            ],
            [
                'nombre' => 'Ana Rodríguez',
                'email' => 'ana.rodriguez@example.com',
                'telefono' => '777-888-9999',
                'direccion' => 'Callejón 321, Barrio',
                'activo' => false
            ],
            [
                'nombre' => 'Luis Martínez',
                'email' => 'luis.martinez@example.com',
                'telefono' => '111-222-3333',
                'direccion' => 'Avenida Norte 654, Distrito',
                'activo' => true
            ]
        ];

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }
    }
} 