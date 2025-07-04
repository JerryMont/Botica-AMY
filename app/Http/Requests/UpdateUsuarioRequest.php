<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUsuarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('id') ?? $this->route('usuario');
        return [
            'nombre_usuario' => 'required|string|unique:usuarios,nombre_usuario,' . $id . ',id_usuario',
            'password' => 'nullable|string|min:6',
            'rol' => 'required|in:admin,vendedor',
            'activo' => 'boolean',
        ];
    }
} 