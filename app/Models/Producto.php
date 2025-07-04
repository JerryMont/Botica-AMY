<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';
    protected $primaryKey = 'id_producto';
    public $timestamps = false;

    protected $fillable = [
        'nombre_producto',
        'descripcion',
        'precio',
        'stock',
    ];

    // Relación: Producto tiene muchos detalle_venta
    public function detalleVentas()
    {
        return $this->hasMany(DetalleVenta::class, 'id_producto', 'id_producto');
    }

    // Relación: Producto tiene muchos movimiento_stock
    public function movimientosStock()
    {
        return $this->hasMany(MovimientoStock::class, 'id_producto', 'id_producto');
    }
} 