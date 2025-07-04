@extends('layouts.app')

@section('title', 'Nuevo Producto - Botica AMY')

@section('content')
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Nuevo Producto</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('productos.store') }}">
        @csrf
        
        <div style="margin-bottom: 20px;">
            <label for="nombre_producto" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Nombre del Producto *
            </label>
            <input 
                type="text" 
                id="nombre_producto" 
                name="nombre_producto" 
                value="{{ old('nombre_producto') }}"
                required
                placeholder="Ingrese el nombre del producto"
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
            <label for="descripcion" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Descripción
            </label>
            <textarea 
                id="descripcion" 
                name="descripcion" 
                placeholder="Ingrese la descripción del producto"
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
            >{{ old('descripcion') }}</textarea>
        </div>

        <div style="margin-bottom: 20px;">
            <label for="precio" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Precio (S/) *
            </label>
            <input 
                type="number" 
                id="precio" 
                name="precio" 
                value="{{ old('precio') }}"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
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
            <label for="stock" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Stock *
            </label>
            <input 
                type="number" 
                id="stock" 
                name="stock" 
                value="{{ old('stock', 0) }}"
                required
                min="0"
                placeholder="0"
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

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-success">
                💾 Guardar Producto
            </button>
            <a href="{{ route('productos.index') }}" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>
@endsection 