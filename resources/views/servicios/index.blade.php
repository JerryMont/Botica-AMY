@extends('layouts.app')

@section('title', 'Gestión de Servicios - Botica AMY')

@section('content')
<h1 style="margin-bottom: 30px; color: #2c3e50;">Gestión de Servicios</h1>

<div style="margin-bottom: 20px;">
    <a href="{{ route('servicios.create') }}" class="btn btn-success">
        🩺 Nuevo Servicio
    </a>
</div>

@if(session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif

<div style="
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin: 0 0 20px 0; color: #2c3e50;">Servicios</h2>

    @if($servicios->count() === 0)
        <p style="text-align: center; color: #7f8c8d; padding: 40px;">
            No hay servicios registrados
        </p>
    @else
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        ">
            @foreach($servicios as $servicio)
                <div style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    background-color: #f8f9fa;
                ">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;">{{ $servicio->titulo }}</h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        {{ $servicio->descripcion ?: 'Sin descripción' }}
                    </p>
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <a href="{{ route('servicios.edit', $servicio) }}" class="btn btn-sm btn-primary">
                            ✏️ Editar
                        </a>
                        <form method="POST" action="{{ route('servicios.destroy', $servicio) }}" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" 
                                    onclick="return confirm('¿Está seguro de eliminar este servicio?')">
                                🗑️ Eliminar
                            </button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection 