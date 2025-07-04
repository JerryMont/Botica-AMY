

<?php $__env->startSection('title', 'Nueva Venta - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<div style="
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1)
">
    <h2 style="margin-top: 0; color: #2c3e50;">Registrar Venta</h2>

    <?php if($errors->any()): ?>
        <div class="alert alert-danger">
            <ul style="margin: 0; padding-left: 20px;">
                <?php $__currentLoopData = $errors->all(); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $error): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li><?php echo e($error); ?></li>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </ul>
        </div>
    <?php endif; ?>

    <form method="POST" action="<?php echo e(route('ventas.store')); ?>" id="ventaForm">
        <?php echo csrf_field(); ?>
        
        <div style="margin-bottom: 20px;">
            <label for="cliente_id" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                Cliente *
            </label>
            <select 
                id="cliente_id" 
                name="cliente_id" 
                required
                style="
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                "
            >
                <option value="">Seleccione cliente</option>
                <?php $__currentLoopData = $clientes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $cliente): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <option value="<?php echo e($cliente->id_cliente); ?>" <?php echo e(old('cliente_id') == $cliente->id_cliente ? 'selected' : ''); ?>>
                        <?php echo e($cliente->nombre); ?>

                    </option>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </select>
        </div>

        <div style="margin-bottom: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px;">Productos</h3>
            <div id="detalles-container">
                <div class="detalle-item" style="
                    border: 1px solid #e1e8ed;
                    border-radius: 6px;
                    padding: 15px;
                    margin-bottom: 15px;
                    background-color: #f8f9fa;
                ">
                    <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 10px; align-items: end;">
                        <div>
                            <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                                Producto *
                            </label>
                            <select 
                                name="detalles[0][id_producto]" 
                                class="producto-select" 
                                required
                                style="
                                    width: 100%;
                                    padding: 8px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                "
                            >
                                <option value="">Seleccione producto</option>
                                <?php $__currentLoopData = $productos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $producto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <option value="<?php echo e($producto->id_producto); ?>" data-precio="<?php echo e($producto->precio); ?>">
                                        <?php echo e($producto->nombre_producto); ?> (Stock: <?php echo e($producto->stock); ?>)
                                    </option>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </select>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                                Cantidad *
                            </label>
                            <input 
                                type="number" 
                                name="detalles[0][cantidad]" 
                                class="cantidad-input" 
                                min="1" 
                                value="1" 
                                required
                                style="
                                    width: 100%;
                                    padding: 8px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                "
                            >
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                                Precio Unit. *
                            </label>
                            <input 
                                type="number" 
                                name="detalles[0][precio_unitario]" 
                                class="precio-input" 
                                min="0" 
                                step="0.01" 
                                value="0.00" 
                                required
                                style="
                                    width: 100%;
                                    padding: 8px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                "
                            >
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                                Subtotal
                            </label>
                            <input 
                                type="text" 
                                class="subtotal-input" 
                                readonly 
                                value="S/ 0.00"
                                style="
                                    width: 100%;
                                    padding: 8px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    background-color: #f8f9fa;
                                    font-weight: bold;
                                "
                            >
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger btn-sm" onclick="removeDetalle(this)" style="margin-top: 20px;">
                                🗑️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="button" onclick="addDetalle()" class="btn btn-warning">
                ➕ Agregar Producto
            </button>
        </div>

        <div style="
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
            text-align: right;
        ">
            <h3 style="margin: 0; color: #2c3e50;">
                Total: <span id="total-venta" style="color: #27ae60;">S/ 0.00</span>
            </h3>
        </div>

        <div style="display: flex; gap: 15px;">
            <button type="submit" class="btn btn-success">
                💾 Guardar Venta
            </button>
            <a href="<?php echo e(route('ventas.index')); ?>" class="btn btn-secondary">
                ❌ Cancelar
            </a>
        </div>
    </form>
</div>

<script>
let detalleIndex = 1;

function addDetalle() {
    const container = document.getElementById('detalles-container');
    const newDetalle = document.createElement('div');
    newDetalle.className = 'detalle-item';
    newDetalle.style.cssText = 'border: 1px solid #e1e8ed; border-radius: 6px; padding: 15px; margin-bottom: 15px; background-color: #f8f9fa;';
    
    newDetalle.innerHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 10px; align-items: end;">
            <div>
                <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                    Producto *
                </label>
                <select 
                    name="detalles[${detalleIndex}][id_producto]" 
                    class="producto-select" 
                    required
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                >
                    <option value="">Seleccione producto</option>
                    <?php $__currentLoopData = $productos; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $producto): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <option value="<?php echo e($producto->id_producto); ?>" data-precio="<?php echo e($producto->precio); ?>">
                            <?php echo e($producto->nombre_producto); ?> (Stock: <?php echo e($producto->stock); ?>)
                        </option>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </select>
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                    Cantidad *
                </label>
                <input 
                    type="number" 
                    name="detalles[${detalleIndex}][cantidad]" 
                    class="cantidad-input" 
                    min="1" 
                    value="1" 
                    required
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                >
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                    Precio Unit. *
                </label>
                <input 
                    type="number" 
                    name="detalles[${detalleIndex}][precio_unitario]" 
                    class="precio-input" 
                    min="0" 
                    step="0.01" 
                    value="0.00" 
                    required
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                >
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold; font-size: 14px;">
                    Subtotal
                </label>
                <input 
                    type="text" 
                    class="subtotal-input" 
                    readonly 
                    value="S/ 0.00"
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; background-color: #f8f9fa; font-weight: bold;"
                >
            </div>
            <div>
                <button type="button" class="btn btn-danger btn-sm" onclick="removeDetalle(this)" style="margin-top: 20px;">
                    🗑️
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(newDetalle);
    detalleIndex++;
    
    // Agregar event listeners al nuevo detalle
    const newSelect = newDetalle.querySelector('.producto-select');
    const newCantidad = newDetalle.querySelector('.cantidad-input');
    const newPrecio = newDetalle.querySelector('.precio-input');
    
    newSelect.addEventListener('change', updatePrecio);
    newCantidad.addEventListener('input', updateSubtotal);
    newPrecio.addEventListener('input', updateSubtotal);
}

function removeDetalle(button) {
    const detalleItem = button.closest('.detalle-item');
    detalleItem.remove();
    updateTotal();
}

function updatePrecio(event) {
    const select = event.target;
    const detalleItem = select.closest('.detalle-item');
    const precioInput = detalleItem.querySelector('.precio-input');
    const selectedOption = select.options[select.selectedIndex];
    
    if (selectedOption.dataset.precio) {
        precioInput.value = selectedOption.dataset.precio;
        updateSubtotal({ target: precioInput });
    }
}

function updateSubtotal(event) {
    const input = event.target;
    const detalleItem = input.closest('.detalle-item');
    const cantidadInput = detalleItem.querySelector('.cantidad-input');
    const precioInput = detalleItem.querySelector('.precio-input');
    const subtotalInput = detalleItem.querySelector('.subtotal-input');
    
    const cantidad = parseFloat(cantidadInput.value) || 0;
    const precio = parseFloat(precioInput.value) || 0;
    const subtotal = cantidad * precio;
    
    subtotalInput.value = `S/ ${subtotal.toFixed(2)}`;
    updateTotal();
}

function updateTotal() {
    const subtotales = document.querySelectorAll('.subtotal-input');
    let total = 0;
    
    subtotales.forEach(input => {
        const valor = parseFloat(input.value.replace('S/ ', '')) || 0;
        total += valor;
    });
    
    document.getElementById('total-venta').textContent = `S/ ${total.toFixed(2)}`;
}

// Event listeners iniciales
document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('.producto-select');
    const cantidades = document.querySelectorAll('.cantidad-input');
    const precios = document.querySelectorAll('.precio-input');
    
    selects.forEach(select => select.addEventListener('change', updatePrecio));
    cantidades.forEach(input => input.addEventListener('input', updateSubtotal));
    precios.forEach(input => input.addEventListener('input', updateSubtotal));
});
</script>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\xampp\htdocs\Botica AMY\resources\views/ventas/create.blade.php ENDPATH**/ ?>