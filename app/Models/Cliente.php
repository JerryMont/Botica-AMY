<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id_cliente
 * @property string $nombre
 * @property string|null $email
 * @property string|null $direccion
 * @property string|null $telefono
 * @property bool $activo
 * @property \Carbon\Carbon|null $fecha_inactividad
 */
class Cliente extends Model
{
    use HasFactory;

    protected $table = 'clientes';
    protected $primaryKey = 'id_cliente';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'email',
        'direccion',
        'telefono',
        'activo',
        'fecha_inactividad',
    ];

    protected $casts = [
        'fecha_inactividad' => 'datetime',
        'activo' => 'boolean',
    ];

    // Accessor para el estado
    public function getEstadoAttribute()
    {
        if ($this->activo) {
            return 'Activo';
        }

        if ($this->fecha_inactividad && $this->fecha_inactividad->addDays(30)->isPast()) {
            return 'Inactivo';
        }

        return 'Desactivado';
    }

    // Relación: Cliente tiene muchas ventas
    public function ventas()
    {
        return $this->hasMany(Venta::class, 'cliente_id', 'id_cliente');
    }
} 