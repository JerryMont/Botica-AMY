

<?php $__env->startSection('title', 'Editar Producto - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Editar Producto</h2>

    <?php if($errors->any()): ?>
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($error); ?></li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="POST" action="<?php echo e(route('productos.update', $producto)); ?>">
        <?php echo csrf_field(); ?>
        <?php echo method_field('PUT'); ?>
        
        <div style="margin-bottom: 20px;">
            <label for="nombre_producto" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Nombre del Producto *
            </label>
            <input 
                type="text" 
                id="nombre_producto" 
                name="nombre_producto" 
                value="<?php echo e(old('nombre_producto', $producto->nombre_producto)); ?>"
                required
                placeholder="Ingrese el nombre del producto"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="margin-bottom: 20px;">
            <label for="descripcion" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Descripción
            </label>
            <textarea 
                id="descripcion" 
                name="descripcion" 
                placeholder="Ingrese la descripción del producto"
                rows="3"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                    resize: vertical;
                "
            ><?php echo e(old('descripcion', $producto->descripcion)); ?></textarea>
        </div>

        <div style="margin-bottom: 20px;">
            <label for="precio" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Precio (S/) *
            </label>
            <input 
                type="number" 
                id="precio" 
                name="precio" 
                value="<?php echo e(old('precio', $producto->precio)); ?>"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="margin-bottom: 30px;">
            <label for="stock" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Stock *
            </label>
            <input 
                type="number" 
                id="stock" 
                name="stock" 
                value="<?php echo e(old('stock', $producto->stock)); ?>"
                required
                min="0"
                placeholder="0"
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
        </div>

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-primary">
                💾 Actualizar Producto
            </button>
            <a href="<?php echo e(route('productos.index')); ?>" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\productos\edit.blade.php ENDPATH**/ ?>