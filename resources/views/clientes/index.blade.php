@extends('layouts.app')

@section('title', 'Gestión de Clientes - Botica AMY')

@section('content')
<h1 style="margin-bottom: 30px; color: #2c3e50;">Gestión de Clientes</h1>

<div style="margin-bottom: 20px;">
    <a href="{{ route('clientes.create') }}" class="btn btn-success">
        ➕ Nuevo Cliente
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
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #2c3e50;">Lista de Clientes</h2>
        <a href="{{ route('clientes.export') }}" class="btn btn-primary">
            📊 Exportar CSV
        </a>
    </div>

    <!-- Búsqueda -->
    <form method="GET" action="{{ route('clientes.index') }}" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px;">
            <input 
                type="text" 
                name="search" 
                value="{{ $search }}" 
                placeholder="Buscar por nombre o email..."
                style="
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                "
            >
            <button type="submit" class="btn btn-primary">🔍 Buscar</button>
            @if($search)
                <a href="{{ route('clientes.index') }}" class="btn btn-secondary">Limpiar</a>
            @endif
        </div>
    </form>

    @if($clientes->count() === 0)
        <p style="text-align: center; color: #7f8c8d;">
            {{ $search ? 'No se encontraron clientes con esa búsqueda' : 'No hay clientes registrados' }}
        </p>
    @else
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        ">
            @foreach($clientes as $cliente)
                <div style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    background-color: #f8f9fa;
                ">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;">{{ $cliente->nombre }}</h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        📧 {{ $cliente->email }}
                    </p>
                    @if($cliente->telefono)
                        <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                            📞 {{ $cliente->telefono }}
                        </p>
                    @endif
                    @if($cliente->direccion)
                        <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                            📍 {{ $cliente->direccion }}
                        </p>
                    @endif
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <a href="{{ route('clientes.edit', $cliente) }}" class="btn btn-sm btn-primary">
                            ✏️ Editar
                        </a>
                        <form method="POST" action="{{ route('clientes.destroy', $cliente) }}" style="display: inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-danger" 
                                    onclick="return confirm('¿Está seguro de eliminar este cliente?')">
                                🗑️ Eliminar
                            </button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Paginación -->
        <div style="display: flex; justify-content: center;">
            {{ $clientes->appends(['search' => $search])->links() }}
        </div>
    @endif
</div>
@endsection 