<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovimientoStock extends Model
{
    use HasFactory;

    protected $table = 'movimiento_stocks';
    protected $primaryKey = 'id_movimiento';
    public $timestamps = false;

    protected $fillable = [
        'id_producto',
        'tipo',
        'cantidad',
        'fecha',
        'descripcion',
    ];

    // Relación: MovimientoStock pertenece a un producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto', 'id_producto');
    }
} 