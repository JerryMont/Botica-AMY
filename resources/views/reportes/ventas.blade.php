@extends('layouts.app')

@section('title', 'Reporte de Ventas - Botica AMY')

@section('content')
<h1 style="margin-bottom: 30px; color: #2c3e50;">Reporte de Ventas</h1>

@if($errors->any())
    <div class="alert alert-danger">
        @foreach($errors->all() as $error)
            {{ $error }}
        @endforeach
    </div>
@endif

<div style="
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 30px;
">
    <h2 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">
        📊 Reporte de Ventas
        <span style="font-size: 16px; color: #7f8c8d; font-weight: normal;">
            ({{ $reporte['fecha_inicio'] }} - {{ $reporte['fecha_fin'] }})
        </span>
    </h2>

    <!-- Resumen -->
    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    ">
        <div style="
            background-color: #e8f5e8;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        ">
            <h3 style="margin: 0 0 10px 0; color: #27ae60;">Total Ventas</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #27ae60;">
                {{ $reporte['total_ventas'] }}
            </p>
        </div>

        <div style="
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        ">
            <h3 style="margin: 0 0 10px 0; color: #f39c12;">Productos Vendidos</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f39c12;">
                {{ $reporte['total_productos_vendidos'] }}
            </p>
        </div>

        <div style="
            background-color: #d1ecf1;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        ">
            <h3 style="margin: 0 0 10px 0; color: #17a2b8;">Monto Total</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #17a2b8;">
                S/ {{ number_format($reporte['monto_total'], 2) }}
            </p>
        </div>
    </div>

    <!-- Detalle por Producto -->
    @if(count($reporte['detalle_por_producto']) > 0)
        <div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 Detalle por Producto</h3>
            <div style="
                background-color: #f8f9fa;
                border-radius: 6px;
                padding: 20px;
            ">
                @foreach($reporte['detalle_por_producto'] as $detalle)
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #e9ecef;
                    ">
                        <div>
                            <strong style="color: #2c3e50;">{{ $detalle['producto']['nombre_producto'] }}</strong>
                        </div>
                        <div style="display: flex; gap: 20px;">
                            <span style="color: #7f8c8d;">
                                Cantidad: <strong>{{ $detalle['cantidad_vendida'] }}</strong>
                            </span>
                            <span style="color: #27ae60; font-weight: bold;">
                                Total: S/ {{ number_format($detalle['total_vendido'], 2) }}
                            </span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @else
        <div style="
            text-align: center;
            padding: 40px;
            color: #7f8c8d;
        ">
            <p>No se encontraron ventas en el período seleccionado</p>
        </div>
    @endif
</div>

<div style="display: flex; gap: 15px;">
    <a href="{{ route('reportes.index') }}" class="btn btn-secondary">
        🔙 Volver a Reportes
    </a>
    <a href="{{ route('dashboard') }}" class="btn btn-primary">
        🏠 Ir al Dashboard
    </a>
</div>
@endsection 