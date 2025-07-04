<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre_usuario' => 'required|string|unique:usuarios,nombre_usuario',
            'password' => 'required|string|min:6',
            'rol' => 'required|in:admin,vendedor',
            'activo' => 'boolean',
        ];
    }
} 