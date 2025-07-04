<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cliente;

class ClienteSeeder extends Seeder
{
    public function run(): void
    {
        Cliente::insert([
            [
                'nombre' => 'Juan Pérez',
                'direccion' => 'Av. Principal 123',
                'telefono' => '987654321',
            ],
            [
                'nombre' => 'María López',
                'direccion' => 'Calle Secundaria 456',
                'telefono' => '912345678',
            ],
            [
                'nombre' => 'Carlos Sánchez',
                'direccion' => 'Jr. Los Olivos 789',
                'telefono' => '998877665',
            ],
        ]);
    }
} 