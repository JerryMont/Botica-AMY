

<?php $__env->startSection('title', 'Detalle de Venta - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<div style="border: 1px solid #ccc; padding: 24px; margin: 24px 0; border-radius: 8px; background: #fff;">
    <h3>Detalle de Venta #<?php echo e($venta->id_venta); ?></h3>
    <p>Fecha: <?php echo e(\Carbon\Carbon::parse($venta->fecha)->format('d/m/Y H:i')); ?></p>
    <p>Cliente: <?php echo e($venta->cliente->nombre ?? '-'); ?></p>
    <p>Usuario: <?php echo e($venta->usuario->nombre_usuario ?? '-'); ?></p>
    <p>Total: <b>S/ <?php echo e(number_format($venta->total, 2)); ?></b></p>
    <h4>Productos:</h4>
    <ul>
        <?php $__currentLoopData = $venta->detalles; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $d): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <li>
                <?php echo e($d->producto->nombre_producto ?? '-'); ?> - Cantidad: <?php echo e($d->cantidad); ?> - Precio: S/ <?php echo e(number_format($d->precio_unitario, 2)); ?>

            </li>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </ul>
    <a href="<?php echo e(route('ventas.index')); ?>" class="btn btn-secondary">Volver a ventas</a>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\ventas\show.blade.php ENDPATH**/ ?>