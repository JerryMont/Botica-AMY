<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CategoriaProducto;

class CategoriaProductoSeeder extends Seeder
{
    public function run(): void
    {
        CategoriaProducto::insert([
            ['nombre_categoria' => 'Medicamentos'],
            ['nombre_categoria' => 'Cuidado Personal'],
            ['nombre_categoria' => 'Vitaminas'],
        ]);
    }
} 