<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $__env->yieldContent('title', 'Botica AMY - Login'); ?></title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f6fa;
            color: #2c3e50;
            line-height: 1.6;
        }

        .auth-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .auth-card {
            background-color: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
        }

        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .auth-header h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 28px;
        }

        .auth-header p {
            color: #7f8c8d;
            margin: 0;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #2c3e50;
            font-weight: 500;
        }

        .form-control {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            box-sizing: border-box;
        }

        .form-control:focus {
            outline: none;
            border-color: #3498db;
            box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }

        .password-field {
            position: relative;
        }

        .password-toggle {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #888;
            font-size: 18px;
            padding: 0;
        }

        .btn {
            width: 100%;
            padding: 12px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .btn:hover {
            background-color: #2980b9;
        }

        .btn:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
        }

        .alert {
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }

        .alert-danger {
            background-color: #e74c3c;
            color: white;
        }

        .alert-success {
            background-color: #2ecc71;
            color: white;
        }

        .credentials-info {
            margin-top: 20px;
            text-align: center;
            color: #7f8c8d;
            font-size: 14px;
        }

        .credentials-info p {
            margin: 5px 0;
        }

        .credentials-info strong {
            color: #2c3e50;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <?php echo $__env->yieldContent('content'); ?>
    </div>

    <script>
        function togglePassword() {
            const passwordField = document.getElementById('password');
            const toggleBtn = document.getElementById('password-toggle');
            
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleBtn.textContent = '🙈';
                toggleBtn.setAttribute('aria-label', 'Ocultar contraseña');
            } else {
                passwordField.type = 'password';
                toggleBtn.textContent = '👁️';
                toggleBtn.setAttribute('aria-label', 'Mostrar contraseña');
            }
        }
    </script>
</body>
</html>
<?php /**PATH D:\Xampp\htdocs\Botica-AMY\resources\views/layouts/auth.blade.php ENDPATH**/ ?>