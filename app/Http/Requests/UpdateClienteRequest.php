<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClienteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $clienteId = $this->route('cliente'); // ID del cliente que se está actualizando
        
        return [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:clientes,email,' . $clienteId . ',id_cliente|max:255',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'activo' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.required' => 'El nombre es obligatorio',
            'nombre.string' => 'El nombre debe ser texto',
            'email.required' => 'El email es obligatorio',
            'email.email' => 'El email debe tener un formato válido',
            'email.unique' => 'Este email ya está registrado por otro cliente. Por favor, use otro email',
            'direccion.string' => 'La dirección debe ser texto',
            'telefono.string' => 'El teléfono debe ser texto',
            'activo.required' => 'El estado activo es obligatorio',
            'activo.boolean' => 'El estado activo debe ser verdadero o falso',
        ];
    }
} 