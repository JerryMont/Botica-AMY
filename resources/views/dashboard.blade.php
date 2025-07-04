@extends('layouts.app')

@section('title', 'Dashboard - Botica AMY')

@section('content')
<h1 style="margin-bottom: 30px; color: #2c3e50;">Dashboard</h1>

<!-- Widgets de estadísticas -->
<div class="dashboard-grid">
    <!-- Widget Total Productos -->
    <div class="dashboard-widget" style="border-left: 4px solid #3498db;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Productos</h3>
                <p style="color: #3498db;">{{ $stats['totalProductos'] }}</p>
            </div>
            <span class="widget-icon">💊</span>
        </div>
    </div>

    <!-- Widget Total Clientes -->
    <div class="dashboard-widget" style="border-left: 4px solid #2ecc71;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Clientes</h3>
                <p style="color: #2ecc71;">{{ $stats['totalClientes'] }}</p>
            </div>
            <span class="widget-icon">👥</span>
        </div>
    </div>

    <!-- Widget Total Ventas -->
    <div class="dashboard-widget" style="border-left: 4px solid #f39c12;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Ventas</h3>
                <p style="color: #f39c12;">{{ $stats['totalVentas'] }}</p>
            </div>
            <span class="widget-icon">💰</span>
        </div>
    </div>

    <!-- Widget Stock Bajo -->
    <div class="dashboard-widget" style="border-left: 4px solid #e74c3c;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Stock Bajo</h3>
                <p style="color: #e74c3c;">{{ $stats['stockBajo'] }}</p>
            </div>
            <span class="widget-icon">⚠️</span>
        </div>
    </div>
</div>

<!-- Acciones Rápidas -->
<div class="actions-card">
    <h2>Acciones Rápidas</h2>
    <div class="actions-buttons">
        <a href="/reportes" class="action-btn btn-primary">
            📊 Ver Reportes
        </a>
        <a href="/ventas/nueva" class="action-btn btn-success">
            💰 Nueva Venta
        </a>
        <a href="/clientes/nuevo" class="action-btn btn-warning">
            👥 Nuevo Cliente
        </a>
        <a href="/productos/nuevo" class="action-btn btn-primary">
            💊 Nuevo Producto
        </a>
    </div>
</div>
@endsection