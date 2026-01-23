<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas';
    protected $primaryKey = 'id_venta';
    public $timestamps = false;

    protected $fillable = [
        'fecha',
        'fecha_venta',
        'total',
        'cliente_id',
        'id_cliente',
        'usuario_id',
        'id_usuario',
        'estado',
    ];

    protected $casts = [
        'estado' => 'string',
    ];

    // Relación: Venta pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'id_usuario');
    }

    // Relación: Venta pertenece a un cliente
    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id', 'id_cliente');
    }

    // Relación: Venta tiene muchos detalle_venta
    public function detalles()
    {
        return $this->hasMany(DetalleVenta::class, 'id_venta', 'id_venta');
    }
} 