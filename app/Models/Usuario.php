<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    protected $fillable = [
        'nombre_usuario',
        'password',
        'rol',
        'activo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relación: Usuario tiene muchas ventas
    public function ventas()
    {
        return $this->hasMany(Venta::class, 'usuario_id', 'id_usuario');
    }

    // Método para verificar rol
    public function isAdmin()
    {
        return $this->rol === 'admin';
    }

    public function isVendedor()
    {
        return $this->rol === 'vendedor';
    }
} 