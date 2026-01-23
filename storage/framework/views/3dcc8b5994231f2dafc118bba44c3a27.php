

<?php $__env->startSection('title', 'Login - Botica AMY'); ?>

<?php $__env->startSection('content'); ?>
<div class="auth-card">
    <div class="auth-header">
        <h1>🏥 Botica AMY</h1>
        <p>Sistema de Gestión</p>
    </div>

    <form method="POST" action="<?php echo e(route('login')); ?>">
        <?php echo csrf_field(); ?>
        
        <?php if($errors->has('login')): ?>
            <div class="alert alert-danger">
                <?php echo e($errors->first('login')); ?>

            </div>
        <?php endif; ?>

        <?php if(session('success')): ?>
            <div class="alert alert-success">
                <?php echo e(session('success')); ?>

            </div>
        <?php endif; ?>

        <div class="form-group">
            <label for="nombre_usuario">Usuario</label>
            <input 
                type="text" 
                id="nombre_usuario" 
                name="nombre_usuario" 
                class="form-control" 
                value="<?php echo e(old('nombre_usuario')); ?>" 
                required 
                placeholder="Ingrese su usuario"
                autocomplete="username"
            >
        </div>

        <div class="form-group">
            <label for="password">Contraseña</label>
            <div class="password-field">
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    class="form-control" 
                    required 
                    placeholder="Ingrese su contraseña"
                    autocomplete="current-password"
                    style="padding-right: 40px;"
                >
                <button 
                    type="button" 
                    id="password-toggle"
                    class="password-toggle" 
                    onclick="togglePassword()"
                    tabindex="-1"
                    aria-label="Mostrar contraseña"
                >
                    👁️
                </button>
            </div>
        </div>

        <button type="submit" class="btn">
            Iniciar Sesión
        </button>
    </form>

    <div class="credentials-info">
        <p>Si necesitas cuentas de prueba, crea usuarios mediante seeders locales o contacta al administrador.</p>
        <p class="small">Nota: Las credenciales no se muestran en la interfaz por seguridad.</p>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.auth', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH D:\Xampp\htdocs\Botica-AMY\resources\views/auth/login.blade.php ENDPATH**/ ?>