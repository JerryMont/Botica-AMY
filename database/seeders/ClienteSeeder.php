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
                'telefono' => '123-456-7890',
                'direccion' => 'Av. Principal 123, Ciudad'
            ],
            [
                'nombre' => 'María García',
                'telefono' => '098-765-4321',
                'direccion' => 'Calle Secundaria 456, Pueblo'
            ],
            [
                'nombre' => 'Carlos López',
                'telefono' => '555-123-4567',
                'direccion' => 'Plaza Central 789, Villa'
            ],
            [
                'nombre' => 'Ana Rodríguez',
                'telefono' => '777-888-9999',
                'direccion' => 'Callejón 321, Barrio'
            ],
            [
                'nombre' => 'Luis Martínez',
                'telefono' => '111-222-3333',
                'direccion' => 'Avenida Norte 654, Distrito'
            ]
        ];

        foreach ($clientes as $cliente) {
            Cliente::create($cliente);
        }
    }
} 