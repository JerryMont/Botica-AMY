

<?php $__env->startSection('title', 'Reporte de Stock - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Reporte de Stock</h1>

<div style="
    background-color: white;
    border-radius: 8px;
    padding: 25px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 30px;
">
    <h2 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">
        📦 Productos con Stock Bajo
        <span style="font-size: 16px; color: #7f8c8d; font-weight: normal;">
            (Umbral: ≤ <?php echo e($umbral); ?>)
        </span>
    </h2>

    <!-- Filtro -->
    <form method="GET" action="<?php echo e(route('reportes.stock')); ?>" style="margin-bottom: 20px;">
        <div style="display: flex; gap: 10px; align-items: end;">
            <div style="flex: 1;">
                <label for="umbral" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                    Cambiar Umbral de Stock
                </label>
                <input 
                    type="number" 
                    id="umbral" 
                    name="umbral" 
                    value="<?php echo e($umbral); ?>"
                    min="1"
                    style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        font-size: 14px;
                        box-sizing: border-box;
                    "
                >
            </div>
            <button type="submit" class="btn btn-warning">
                🔄 Actualizar
            </button>
        </div>
    </form>

    <!-- Lista de Productos -->
    <?php if($productos->count() > 0): ?>
        <div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">
                ⚠️ Productos con stock ≤ <?php echo e($umbral); ?> (<?php echo e($productos->count()); ?> productos)
            </h3>
            <div style="
                background-color: #f8f9fa;
                border-radius: 6px;
                padding: 20px;
            ">
                <?php $__currentLoopData = $productos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $producto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px;
                        margin-bottom: 10px;
                        border-radius: 4px;
                        background-color: white;
                        border-left: 4px solid <?php echo e($producto->stock == 0 ? '#e74c3c' : '#f39c12'); ?>;
                    ">
                        <div>
                            <strong style="color: #2c3e50;"><?php echo e($producto->nombre_producto); ?></strong>
                            <?php if($producto->descripcion): ?>
                                <p style="margin: 5px 0 0 0; color: #7f8c8d; font-size: 14px;">
                                    <?php echo e($producto->descripcion); ?>

                                </p>
                            <?php endif; ?>
                        </div>
                        <div style="display: flex; gap: 20px; align-items: center;">
                            <span style="
                                color: <?php echo e($producto->stock == 0 ? '#e74c3c' : '#f39c12'); ?>;
                                font-weight: bold;
                                font-size: 16px;
                            ">
                                Stock: <?php echo e($producto->stock); ?>

                            </span>
                            <span style="color: #27ae60; font-weight: bold;">
                                S/ <?php echo e(number_format($producto->precio, 2)); ?>

                            </span>
                            <a href="<?php echo e(route('productos.edit', $producto)); ?>" class="btn btn-sm btn-primary">
                                ✏️ Editar
                            </a>
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
            <p>✅ No hay productos con stock bajo (≤ <?php echo e($umbral); ?>)</p>
            <p style="font-size: 14px; margin-top: 10px;">
                Todos los productos tienen stock suficiente
            </p>
        </div>
    <?php endif; ?>
</div>

<div style="display: flex; gap: 15px;">
    <a href="<?php echo e(route('reportes.index')); ?>" class="btn btn-secondary">
        🔙 Volver a Reportes
    </a>
    <a href="<?php echo e(route('productos.index')); ?>" class="btn btn-success">
        💊 Gestionar Productos
    </a>
    <a href="<?php echo e(route('dashboard')); ?>" class="btn btn-primary">
        🏠 Ir al Dashboard
    </a>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\xampp\htdocs\Botica AMY\resources\views/reportes/stock.blade.php ENDPATH**/ ?>