@extends('layouts.app')

@section('title', 'Editar Servicio - Botica AMY')

@section('content')
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Editar Servicio</h2>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form method="POST" action="{{ route('servicios.update', $servicio) }}">
        @csrf
        @method('PUT')
        
        <div style="margin-bottom: 20px;">
            <label for="titulo" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Título *
            </label>
            <input 
                type="text" 
                id="titulo" 
                name="titulo" 
                value="{{ old('titulo', $servicio->titulo) }}"
                required
                placeholder="Ingrese el título del servicio"
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
            <label for="descripcion" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Descripción
            </label>
            <textarea 
                id="descripcion" 
                name="descripcion" 
                placeholder="Ingrese la descripción del servicio"
                rows="4"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    resize: vertical;
                "
            >{{ old('descripcion', $servicio->descripcion) }}</textarea>
        </div>

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-primary">
                💾 Actualizar Servicio
            </button>
            <a href="{{ route('servicios.index') }}" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>
@endsection 