

<?php $__env->startSection('title', 'Reporte de Ventas - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Reporte de Ventas</h1>

<?php if($errors->any()): ?>
    <div class="alert alert-danger">
        <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo e($error); ?>

        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
<?php endif; ?>

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
            (<?php echo e($reporte['fecha_inicio']); ?> - <?php echo e($reporte['fecha_fin']); ?>)
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
                <?php echo e($reporte['total_ventas']); ?>

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
                <?php echo e($reporte['total_productos_vendidos']); ?>

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
                S/ <?php echo e(number_format($reporte['monto_total'], 2)); ?>

            </p>
        </div>
    </div>

    <!-- Detalle por Producto -->
    <?php if(count($reporte['detalle_por_producto']) > 0): ?>
        <div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">📋 Detalle por Producto</h3>
            <div style="
                background-color: #f8f9fa;
                border-radius: 6px;
                padding: 20px;
            ">
                <?php $__currentLoopData = $reporte['detalle_por_producto']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $detalle): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 10px 0;
                        border-bottom: 1px solid #e9ecef;
                    ">
                        <div>
                            <strong style="color: #2c3e50;"><?php echo e($detalle['producto']['nombre_producto']); ?></strong>
                        </div>
                        <div style="display: flex; gap: 20px;">
                            <span style="color: #7f8c8d;">
                                Cantidad: <strong><?php echo e($detalle['cantidad_vendida']); ?></strong>
                            </span>
                            <span style="color: #27ae60; font-weight: bold;">
                                Total: S/ <?php echo e(number_format($detalle['total_vendido'], 2)); ?>

                            </span>
                        </div>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        </div>
    <?php else: ?>
        <div style="
            text-align: center;
            padding: 40px;
            color: #7f8c8d;
        ">
            <p>No se encontraron ventas en el período seleccionado</p>
        </div>
    <?php endif; ?>
</div>

<div style="display: flex; gap: 15px;">
    <a href="<?php echo e(route('reportes.index')); ?>" class="btn btn-secondary">
        🔙 Volver a Reportes
    </a>
    <a href="<?php echo e(route('dashboard')); ?>" class="btn btn-primary">
        🏠 Ir al Dashboard
    </a>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\reportes\ventas.blade.php ENDPATH**/ ?>