@extends('layouts.app')

@section('title', 'Dashboard Avanzado - Botica AMY')

@section('content')
<h1 style="margin-bottom: 30px; color: #2c3e50;">Dashboard Avanzado</h1>

<!-- Estadísticas en Tiempo Real -->
<div style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
">
    <div style="
        background-color: #e8f5e8;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
        <h3 style="margin: 0 0 10px 0; color: #27ae60;">Ventas Hoy</h3>
        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #27ae60;">
            {{ $stats['total_ventas_hoy'] }}
        </p>
    </div>

    <div style="
        background-color: #d1ecf1;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
        <h3 style="margin: 0 0 10px 0; color: #17a2b8;">Monto Hoy</h3>
        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #17a2b8;">
            S/ {{ number_format($stats['monto_ventas_hoy'], 2) }}
        </p>
    </div>

    <div style="
        background-color: #fff3cd;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
        <h3 style="margin: 0 0 10px 0; color: #f39c12;">Stock Bajo</h3>
        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #f39c12;">
            {{ $stats['productos_stock_bajo'] }}
        </p>
    </div>

    <div style="
        background-color: #f8d7da;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
        <h3 style="margin: 0 0 10px 0; color: #dc3545;">Ventas Semana</h3>
        <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc3545;">
            {{ $stats['ventas_ultima_semana'] }}
        </p>
    </div>
</div>

<!-- Acciones Rápidas -->
<div style="
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 30px;
">
    <h2 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">🚀 Acciones Rápidas</h2>
    
    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    ">
        <a href="{{ route('reportes.ventas') }}" class="btn btn-primary" style="text-align: center;">
            📊 Reporte de Ventas
        </a>
        <a href="{{ route('reportes.stock') }}" class="btn btn-warning" style="text-align: center;">
            📦 Reporte de Stock
        </a>
        <a href="{{ route('productos.index') }}" class="btn btn-success" style="text-align: center;">
            💊 Gestionar Productos
        </a>
        <a href="{{ route('clientes.index') }}" class="btn btn-info" style="text-align: center;">
            👥 Gestionar Clientes
        </a>
    </div>
</div>

<!-- Información del Sistema -->
<div style="
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
">
    <h2 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">ℹ️ Información del Sistema</h2>
    
    <div style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
    ">
        <div>
            <h4 style="color: #2c3e50; margin-bottom: 10px;">📈 Métricas de Productos</h4>
            <ul style="color: #7f8c8d; line-height: 1.8;">
                <li>Total de productos: <strong>{{ $stats['total_productos'] }}</strong></li>
                <li>Productos con stock bajo: <strong>{{ $stats['productos_stock_bajo'] }}</strong></li>
                <li>Productos con stock normal: <strong>{{ $stats['total_productos'] - $stats['productos_stock_bajo'] }}</strong></li>
            </ul>
        </div>
        
        <div>
            <h4 style="color: #2c3e50; margin-bottom: 10px;">💰 Métricas de Ventas</h4>
            <ul style="color: #7f8c8d; line-height: 1.8;">
                <li>Ventas realizadas hoy: <strong>{{ $stats['total_ventas_hoy'] }}</strong></li>
                <li>Monto total hoy: <strong>S/ {{ number_format($stats['monto_ventas_hoy'], 2) }}</strong></li>
                <li>Ventas en la última semana: <strong>{{ $stats['ventas_ultima_semana'] }}</strong></li>
            </ul>
        </div>
    </div>
</div>

<div style="display: flex; gap: 15px; margin-top: 30px;">
    <a href="{{ route('reportes.index') }}" class="btn btn-secondary">
        🔙 Volver a Reportes
    </a>
    <a href="{{ route('dashboard') }}" class="btn btn-primary">
        🏠 Dashboard Principal
    </a>
</div>
@endsection 