

<?php $__env->startSection('title', 'Reportes y Estadísticas - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<h1 style="margin-bottom: 30px; color: #2c3e50;">Reportes y Estadísticas</h1>

<div style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
">
    <!-- Reporte de Ventas -->
    <div style="
        background-color: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1)
    ">
        <h3 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">📊 Reporte de Ventas</h3>
        
        <form method="GET" action="<?php echo e(route('reportes.ventas')); ?>" style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <label for="fecha_inicio" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                        Fecha Inicio
                    </label>
                    <input 
                        type="date" 
                        id="fecha_inicio" 
                        name="fecha_inicio" 
                        required
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
                <div style="flex: 1;">
                    <label for="fecha_fin" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                        Fecha Fin
                    </label>
                    <input 
                        type="date" 
                        id="fecha_fin" 
                        name="fecha_fin" 
                        required
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
            </div>
            <button type="submit" class="btn btn-primary">
                🔍 Generar Reporte
            </button>
        </form>

        <div style="color: #7f8c8d; font-size: 14px;">
            <p>💡 Selecciona un rango de fechas para generar el reporte de ventas</p>
        </div>
    </div>
    
    <!-- Reporte de Stock -->
    <div style="
        background-color: white;
        border-radius: 8px;
        padding: 25px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1)
    ">
        <h3 style="margin-top: 0; color: #2c3e50; margin-bottom: 20px;">📦 Productos con Stock Bajo</h3>
        
        <form method="GET" action="<?php echo e(route('reportes.stock')); ?>" style="margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; align-items: end; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <label for="umbral" style="display: block; margin-bottom: 5px; color: #2c3e50; font-weight: bold;">
                        Umbral de Stock
                    </label>
                    <input 
                        type="number" 
                        id="umbral" 
                        name="umbral" 
                        value="10"
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

        <div style="color: #7f8c8d; font-size: 14px;">
            <p>💡 Muestra productos con stock menor o igual al umbral especificado</p>
        </div>
    </div>
</div>

<!-- Enlaces rápidos -->
<div style="
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-top: 30px;
">
    <h3 style="margin-top: 0; color: #2c3e50; margin-bottom: 15px;">🚀 Acciones Rápidas</h3>
    <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <a href="<?php echo e(route('reportes.dashboard')); ?>" class="btn btn-primary">
            📈 Dashboard Avanzado
        </a>
        <a href="<?php echo e(route('productos.index')); ?>" class="btn btn-success">
            💊 Ver Productos
        </a>
        <a href="<?php echo e(route('clientes.index')); ?>" class="btn btn-warning">
            👥 Ver Clientes
        </a>
    </div>
</div>
<?php $__env->stopSection(); ?> 
<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica_amy\Botica-AMY\resources\views\reportes\index.blade.php ENDPATH**/ ?>