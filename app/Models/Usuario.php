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
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'activo' => 'boolean',
    ];

    // Método para obtener el nombre del identificador de autenticación
    public function getAuthIdentifierName()
    {
        return 'nombre_usuario';
    }

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