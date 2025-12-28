

<?php $__env->startSection('title', 'Editar Cliente - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Editar Cliente</h2>

    <?php if($errors->any()): ?>
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($error); ?></li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="POST" action="<?php echo e(route('clientes.update', $cliente)); ?>">
        <?php echo csrf_field(); ?>
        <?php echo method_field('PUT'); ?>
        
        <div style="margin-bottom: 20px;">
            <label for="nombre" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Nombre *
            </label>
            <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value="<?php echo e(old('nombre', $cliente->nombre)); ?>"
                required
                placeholder="Ingrese el nombre del cliente"
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
            <label for="email" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Email *
            </label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value="<?php echo e(old('email', $cliente->email)); ?>"
                required
                placeholder="Ingrese el email del cliente"
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
            <label for="telefono" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Teléfono
            </label>
            <input 
                type="text" 
                id="telefono" 
                name="telefono" 
                value="<?php echo e(old('telefono', $cliente->telefono)); ?>"
                placeholder="Ingrese el teléfono del cliente"
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
            <label for="direccion" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Dirección
            </label>
            <textarea 
                id="direccion" 
                name="direccion" 
                placeholder="Ingrese la dirección del cliente"
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
            ><?php echo e(old('direccion', $cliente->direccion)); ?></textarea>
        </div>

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-primary">
                💾 Actualizar Cliente
            </button>
            <a href="<?php echo e(route('clientes.index')); ?>" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\clientes\edit.blade.php ENDPATH**/ ?>