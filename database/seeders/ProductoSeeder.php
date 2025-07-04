<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            [
                'nombre_producto' => 'Paracetamol 500mg',
                'descripcion' => 'Analgésico y antipirético para aliviar dolores y fiebre',
                'precio' => 8.50,
                'stock' => 100,
            ],
            [
                'nombre_producto' => 'Ibuprofeno 400mg',
                'descripcion' => 'Antiinflamatorio no esteroideo para dolores musculares',
                'precio' => 12.00,
                'stock' => 85,
            ],
            [
                'nombre_producto' => 'Vitamina C 1000mg',
                'descripcion' => 'Suplemento vitamínico para fortalecer el sistema inmune',
                'precio' => 20.00,
                'stock' => 75,
            ],
            [
                'nombre_producto' => 'Shampoo Anticaspa',
                'descripcion' => 'Para el cuidado del cabello y control de la caspa',
                'precio' => 15.00,
                'stock' => 50,
            ],
            [
                'nombre_producto' => 'Jabón Antibacterial',
                'descripcion' => 'Jabón para manos con protección antibacterial',
                'precio' => 5.50,
                'stock' => 120,
            ],
            [
                'nombre_producto' => 'Crema Hidratante',
                'descripcion' => 'Crema facial para hidratación profunda',
                'precio' => 25.00,
                'stock' => 30,
            ],
            [
                'nombre_producto' => 'Aspirina 100mg',
                'descripcion' => 'Analgésico y anticoagulante',
                'precio' => 6.00,
                'stock' => 8,
            ],
            [
                'nombre_producto' => 'Protector Solar SPF 50',
                'descripcion' => 'Protección solar de amplio espectro',
                'precio' => 35.00,
                'stock' => 25,
            ]
        ];

        foreach ($productos as $producto) {
            Producto::create($producto);
        }
    }
} 