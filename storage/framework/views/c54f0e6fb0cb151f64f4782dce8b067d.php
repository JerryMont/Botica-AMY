

<?php $__env->startSection('title', 'Dashboard - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Dashboard</h1>

<!-- Widgets de estadísticas -->
<div class="dashboard-grid">
    <!-- Widget Total Productos -->
    <div class="dashboard-widget" style="border-left: 4px solid #3498db;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Productos</h3>
                <p style="color: #3498db;"><?php echo e($stats['totalProductos']); ?></p>
            </div>
            <span class="widget-icon">💊</span>
        </div>
    </div>

    <!-- Widget Total Clientes -->
    <div class="dashboard-widget" style="border-left: 4px solid #2ecc71;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Clientes</h3>
                <p style="color: #2ecc71;"><?php echo e($stats['totalClientes']); ?></p>
            </div>
            <span class="widget-icon">👥</span>
        </div>
    </div>

    <!-- Widget Total Ventas -->
    <div class="dashboard-widget" style="border-left: 4px solid #f39c12;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Total Ventas</h3>
                <p style="color: #f39c12;"><?php echo e($stats['totalVentas']); ?></p>
            </div>
            <span class="widget-icon">💰</span>
        </div>
    </div>

    <!-- Widget Stock Bajo -->
    <div class="dashboard-widget" style="border-left: 4px solid #e74c3c;">
        <div class="widget-content">
            <div class="widget-info">
                <h3>Stock Bajo</h3>
                <p style="color: #e74c3c;"><?php echo e($stats['stockBajo']); ?></p>
            </div>
            <span class="widget-icon">⚠️</span>
        </div>
    </div>
</div>

<!-- Acciones Rápidas -->
<div class="actions-card">
    <h2>Acciones Rápidas</h2>
    <div class="actions-buttons">
        <a href="<?php echo e(route('reportes.index')); ?>" class="action-btn btn-primary">
            📊 Ver Reportes
        </a>
        <a href="/ventas/nueva" class="action-btn btn-success">
            💰 Nueva Venta
        </a>
        <a href="<?php echo e(route('clientes.index')); ?>" class="action-btn btn-warning">
            👥 Gestión de Clientes
        </a>
        <a href="<?php echo e(route('productos.index')); ?>" class="action-btn btn-primary">
            💊 Gestión de Productos
        </a>
    </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\dashboard.blade.php ENDPATH**/ ?>