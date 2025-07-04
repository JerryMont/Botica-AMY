<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Servicio;

class ServicioSeeder extends Seeder
{
    public function run(): void
    {
        $servicios = [
            [
                'titulo' => 'Toma de presión arterial',
                'descripcion' => 'Servicio de control y monitoreo de la presión arterial con equipos digitales de alta precisión.',
            ],
            [
                'titulo' => 'Aplicación de inyectables',
                'descripcion' => 'Administración de medicamentos inyectables por personal calificado y capacitado.',
            ],
            [
                'titulo' => 'Medición de glucosa',
                'descripcion' => 'Control de niveles de azúcar en sangre con equipos certificados.',
            ],
            [
                'titulo' => 'Vendajes y curaciones',
                'descripcion' => 'Atención de heridas menores, aplicación de vendajes y curaciones básicas.',
            ],
            [
                'titulo' => 'Consulta farmacéutica',
                'descripcion' => 'Asesoramiento sobre medicamentos, interacciones y efectos secundarios.',
            ],
            [
                'titulo' => 'Control de peso y talla',
                'descripcion' => 'Medición de peso corporal y talla con equipos calibrados.',
            ]
        ];

        foreach ($servicios as $servicio) {
            Servicio::create($servicio);
        }
    }
} 