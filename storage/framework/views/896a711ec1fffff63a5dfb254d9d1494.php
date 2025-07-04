

<?php $__env->startSection('title', 'Gestión de Productos - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Gestión de Productos</h1>

<div style="margin-bottom: 20px;">
    <a href="<?php echo e(route('productos.create')); ?>" class="btn btn-success">
        ➕ Nuevo Producto
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
        <h2 style="margin: 0; color: #2c3e50;">Lista de Productos</h2>
        <div style="display: flex; gap: 10px;">
            <a href="<?php echo e(route('productos.export')); ?>" class="btn btn-success">
                📊 CSV
            </a>
        </div>
    </div>

    <!-- Búsqueda -->
    <form method="GET" action="<?php echo e(route('productos.index')); ?>" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px;">
            <input 
                type="text" 
                name="search" 
                value="<?php echo e($search); ?>" 
                placeholder="Buscar productos..."
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
                <a href="<?php echo e(route('productos.index')); ?>" class="btn btn-secondary">Limpiar</a>
            <?php endif; ?>
        </div>
    </form>

    <?php if($productos->count() === 0): ?>
        <p style="text-align: center; color: #7f8c8d;">
            <?php echo e($search ? 'No se encontraron productos con esa búsqueda' : 'No hay productos registrados'); ?>

        </p>
    <?php else: ?>
        <div style="
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        ">
            <?php $__currentLoopData = $productos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $producto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    background-color: #f8f9fa;
                ">
                    <h3 style="margin: 0 0 10px 0; color: #2c3e50;"><?php echo e($producto->nombre_producto); ?></h3>
                    <p style="margin: 5px 0; color: #7f8c8d; font-size: 14px;">
                        <?php echo e($producto->descripcion ?: 'Sin descripción'); ?>

                    </p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span style="
                            font-weight: bold;
                            color: #27ae60;
                            font-size: 16px;
                        ">
                            S/ <?php echo e(number_format($producto->precio, 2)); ?>

                        </span>
                        <span style="
                            color: <?php echo e($producto->stock <= 10 ? '#e74c3c' : '#2ecc71'); ?>;
                            font-weight: bold;
                        ">
                            Stock: <?php echo e($producto->stock); ?>

                        </span>
                    </div>
                    
                    <div style="margin-top: 15px; display: flex; gap: 10px;">
                        <a href="<?php echo e(route('productos.edit', $producto)); ?>" class="btn btn-sm btn-primary">
                            ✏️ Editar
                        </a>
                        <form method="POST" action="<?php echo e(route('productos.destroy', $producto)); ?>" style="display: inline;">
                            <?php echo csrf_field(); ?>
                            <?php echo method_field('DELETE'); ?>
                            <button type="submit" class="btn btn-sm btn-danger" 
                                    onclick="return confirm('¿Está seguro de eliminar este producto?')">
                                🗑️ Eliminar
                            </button>
                        </form>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </div>

        <!-- Paginación -->
        <div style="display: flex; justify-content: center;">
            <?php echo e($productos->appends(['search' => $search])->links()); ?>

        </div>
    <?php endif; ?>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\xampp\htdocs\Botica AMY\resources\views/productos/index.blade.php ENDPATH**/ ?>