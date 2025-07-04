<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MovimientoStock;
use Carbon\Carbon;

class MovimientoStockSeeder extends Seeder
{
    public function run(): void
    {
        MovimientoStock::insert([
            [
                'id_producto' => 1,
                'tipo' => 'entrada',
                'cantidad' => 50,
                'fecha' => Carbon::now()->subDays(5),
                'descripcion' => 'Ingreso de stock inicial',
            ],
            [
                'id_producto' => 2,
                'tipo' => 'salida',
                'cantidad' => 5,
                'fecha' => Carbon::now()->subDays(3),
                'descripcion' => 'Venta a cliente',
            ],
            [
                'id_producto' => 3,
                'tipo' => 'entrada',
                'cantidad' => 30,
                'fecha' => Carbon::now()->subDays(1),
                'descripcion' => 'Reposición de stock',
            ],
        ]);
    }
} 