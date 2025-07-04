<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        Producto::insert([
            [
                'nombre_producto' => 'Paracetamol 500mg',
                'descripcion' => 'Analgésico y antipirético',
                'precio' => 8.50,
                'stock' => 100,
                'id_categoria' => 1,
            ],
            [
                'nombre_producto' => 'Shampoo Anticaspa',
                'descripcion' => 'Para el cuidado del cabello',
                'precio' => 15.00,
                'stock' => 50,
                'id_categoria' => 2,
            ],
            [
                'nombre_producto' => 'Vitamina C 1000mg',
                'descripcion' => 'Suplemento vitamínico',
                'precio' => 20.00,
                'stock' => 75,
                'id_categoria' => 3,
            ],
        ]);
    }
} 