<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        Servicio::insert([
            [
                'titulo' => 'Toma de presión arterial',
                'descripcion' => 'Servicio de control y monitoreo de la presión arterial.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titulo' => 'Aplicación de inyectables',
                'descripcion' => 'Administración de medicamentos inyectables por personal calificado.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
} 