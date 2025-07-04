@extends('layouts.app')

@section('title', 'Editar Cliente - Botica AMY')

@section('content')
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Editar Cliente</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('clientes.update', $cliente) }}">
        @csrf
        @method('PUT')
        
        <div style="margin-bottom: 20px;">
            <label for="nombre" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Nombre *
            </label>
            <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value="{{ old('nombre', $cliente->nombre) }}"
                required
                placeholder="Ingrese el nombre del cliente"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="margin-bottom: 20px;">
            <label for="email" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Email *
            </label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value="{{ old('email', $cliente->email) }}"
                required
                placeholder="Ingrese el email del cliente"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="margin-bottom: 20px;">
            <label for="telefono" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Teléfono
            </label>
            <input 
                type="text" 
                id="telefono" 
                name="telefono" 
                value="{{ old('telefono', $cliente->telefono) }}"
                placeholder="Ingrese el teléfono del cliente"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="margin-bottom: 30px;">
            <label for="direccion" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Dirección
            </label>
            <textarea 
                id="direccion" 
                name="direccion" 
                placeholder="Ingrese la dirección del cliente"
                rows="3"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    resize: vertical;
                "
            >{{ old('direccion', $cliente->direccion) }}</textarea>
        </div>

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-primary">
                💾 Actualizar Cliente
            </button>
            <a href="{{ route('clientes.index') }}" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>
@endsection 