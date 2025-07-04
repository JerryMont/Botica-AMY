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
                'email' => 'juan.perez@email.com',
                'telefono' => '123-456-7890',
                'direccion' => 'Av. Principal 123, Ciudad'
            ],
            [
                'nombre' => 'María García',
                'email' => 'maria.garcia@email.com',
                'telefono' => '098-765-4321',
                'direccion' => 'Calle Secundaria 456, Pueblo'
            ],
            [
                'nombre' => 'Carlos López',
                'email' => 'carlos.lopez@email.com',
                'telefono' => '555-123-4567',
                'direccion' => 'Plaza Central 789, Villa'
            ],
            [
                'nombre' => 'Ana Rodríguez',
                'email' => 'ana.rodriguez@email.com',
                'telefono' => '777-888-9999',
                'direccion' => 'Callejón 321, Barrio'
            ],
            [
                'nombre' => 'Luis Martínez',
                'email' => 'luis.martinez@email.com',
                'telefono' => '111-222-3333',
                'direccion' => 'Avenida Norte 654, Distrito'
            ]
        ];

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }
    }
} 