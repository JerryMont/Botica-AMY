

<?php $__env->startSection('title', 'Gestión de Servicios - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Gestión de Servicios</h1>

<div style="margin-bottom: 20px;">
    <a href="<?php echo e(route('servicios.create')); ?>" class="btn btn-success">
        🩺 Nuevo Servicio
    </a>
</div>

<?php if(session('success')): ?>
    <div class="alert alert-success">
        <?php echo e(session('success')); ?>

    </div>
<?php endif; ?>

<div style="
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin: 0 0 20px 0; color: #2c3e50;">Servicios</h2>

    <?php if($servicios->count() === 0): ?>
        <p style="text-align: center; color: #7f8c8d; padding: 40px;">
            No hay servicios registrados
        </p>
    <?php else: ?>
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
        ">
            <?php $__currentLoopData = $servicios; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $servicio): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    background-color: #f8f9fa;
                ">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;"><?php echo e($servicio->titulo); ?></h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        <?php echo e($servicio->descripcion ?: 'Sin descripción'); ?>

                    </p>
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <a href="<?php echo e(route('servicios.edit', $servicio)); ?>" class="btn btn-sm btn-primary">
                            ✏️ Editar
                        </a>
                        <form method="POST" action="<?php echo e(route('servicios.destroy', $servicio)); ?>" style="display: inline;">
                            <?php echo csrf_field(); ?>
                            <?php echo method_field('DELETE'); ?>
                            <button type="submit" class="btn btn-sm btn-danger" 
                                    onclick="return confirm('¿Está seguro de eliminar este servicio?')">
                                🗑️ Eliminar
                            </button>
                        </form>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>
    <?php endif; ?>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\xampp\htdocs\Botica AMY\resources\views/servicios/index.blade.php ENDPATH**/ ?>