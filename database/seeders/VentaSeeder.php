<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Venta;
use App\Models\DetalleVenta;
use Carbon\Carbon;

class VentaSeeder extends Seeder
{
    public function run(): void
    {
        // Venta 1
        $venta1 = Venta::create([
            'fecha' => Carbon::now()->subDays(2),
            'total' => 43.50,
            'cliente_id' => 1,
            'usuario_id' => 1,
        ]);
        DetalleVenta::insert([
            [
                'id_venta' => $venta1->id_venta,
                'id_producto' => 1,
                'cantidad' => 2,
                'precio_unitario' => 8.50,
            ],
            [
                'id_venta' => $venta1->id_venta,
                'id_producto' => 2,
                'cantidad' => 1,
                'precio_unitario' => 15.00,
            ],
        ]);

        // Venta 2
        $venta2 = Venta::create([
            'fecha' => Carbon::now()->subDay(),
            'total' => 40.00,
            'cliente_id' => 2,
            'usuario_id' => 2,
        ]);
        DetalleVenta::insert([
            [
                'id_venta' => $venta2->id_venta,
                'id_producto' => 3,
                'cantidad' => 2,
                'precio_unitario' => 20.00,
            ],
        ]);
    }
} 