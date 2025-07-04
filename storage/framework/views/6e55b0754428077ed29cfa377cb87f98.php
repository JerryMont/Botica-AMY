

<?php $__env->startSection('title', 'Gestión de Ventas - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Gestión de Ventas</h1>

<div style="margin-bottom: 20px;">
    <a href="<?php echo e(route('ventas.create')); ?>" class="btn btn-success">
        💰 Registrar Venta
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
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #2c3e50;">Lista de Ventas</h2>
        <div style="display: flex; gap: 10px;">
            <a href="<?php echo e(route('ventas.create')); ?>" class="btn btn-primary">
                ➕ Nueva Venta
            </a>
            <a href="<?php echo e(route('ventas.export')); ?>" class="btn btn-success">
                📊 Exportar CSV
            </a>
        </div>
    </div>

    <!-- Búsqueda -->
    <form method="GET" action="<?php echo e(route('ventas.index')); ?>" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px;">
            <input 
                type="text" 
                name="search" 
                value="<?php echo e($search); ?>" 
                placeholder="Buscar por cliente o ID de venta..."
                style="
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                "
            >
            <button type="submit" class="btn btn-primary">🔍 Buscar</button>
            <?php if($search): ?>
                <a href="<?php echo e(route('ventas.index')); ?>" class="btn btn-secondary">Limpiar</a>
            <?php endif; ?>
        </div>
    </form>

    <?php if($ventas->count() === 0): ?>
        <p style="text-align: center; color: #7f8c8d;">
            <?php echo e($search ? 'No se encontraron ventas con esa búsqueda' : 'No hay ventas registradas'); ?>

        </p>
    <?php else: ?>
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        ">
            <?php $__currentLoopData = $ventas; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $venta): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    background-color: #f8f9fa;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <h3 style="margin: 0; color: #2c3e50;">Venta #<?php echo e($venta->id_venta); ?></h3>
                        <span style="
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 12px;
                            font-weight: bold;
                            background-color: #27ae60;
                            color: white;
                        ">
                            Completada
                        </span>
                    </div>
                    
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        👤 <?php echo e($venta->cliente->nombre ?? 'Cliente no encontrado'); ?>

                    </p>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        📅 <?php echo e(\Carbon\Carbon::parse($venta->fecha)->format('d/m/Y')); ?>

                    </p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span style="
                            font-weight: bold;
                            color: #27ae60;
                            font-size: 16px;
                        ">
                            S/ <?php echo e(number_format($venta->total, 2)); ?>

                        </span>
                        <div style="display: flex; gap: 10px;">
                            <a href="<?php echo e(route('ventas.show', $venta)); ?>" class="btn btn-sm btn-primary">
                                👁️ Ver Detalle
                            </a>
                            <form method="POST" action="<?php echo e(route('ventas.destroy', $venta)); ?>" style="display: inline;">
                                <?php echo csrf_field(); ?>
                                <?php echo method_field('DELETE'); ?>
                                <button type="submit" class="btn btn-sm btn-danger" 
                                        onclick="return confirm('¿Está seguro de eliminar esta venta?')">
                                    🗑️ Eliminar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>

        <!-- Paginación -->
        <div style="display: flex; justify-content: center;">
            <?php echo e($ventas->appends(['search' => $search])->links()); ?>

        </div>
    <?php endif; ?>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\xampp\htdocs\Botica AMY\resources\views/ventas/index.blade.php ENDPATH**/ ?>