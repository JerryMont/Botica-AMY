<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Botica AMY - Dashboard')</title>
    <style>
        :root {
            --bg-primary: #f8f9fa;
            --text-primary: #2c3e50;
            --text-secondary: #7f8c8d;
            --border-color: #ecf0f1;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
        }

        .main-container {
            min-height: 100vh;
            background-color: var(--bg-primary);
            display: flex;
            flex-direction: column;
        }

        .navbar {
            background-color: white;
            padding: 15px 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border-bottom: 1px solid var(--border-color);
        }

        .navbar h2 {
            color: var(--text-primary);
        }

        .content-wrapper {
            display: flex;
            flex: 1;
        }

        .sidebar {
            width: 250px;
            background-color: white;
            border-right: 1px solid var(--border-color);
            min-height: calc(100vh - 70px);
            padding: 20px;
        }

        .main-content {
            flex: 1;
            padding: 20px;
            background-color: var(--bg-primary);
            min-height: calc(100vh - 70px);
        }

        .fade-in {
            animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .dashboard-widget {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            flex: 1;
            min-width: 200px;
        }

        .widget-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .widget-info h3 {
            margin: 0 0 8px 0;
            color: #2c3e50;
            font-size: 14px;
            font-weight: 500;
        }

        .widget-info p {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .widget-icon {
            font-size: 32px;
        }

        .actions-card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .actions-card h2 {
            margin-top: 0;
            color: #2c3e50;
        }

        .actions-buttons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }

        .action-btn {
            padding: 12px 20px;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            text-decoration: none;
            display: inline-block;
            transition: opacity 0.3s ease;
        }

        .action-btn:hover {
            opacity: 0.9;
        }

        .btn-primary { background-color: #3498db; }
        .btn-success { background-color: #2ecc71; }
        .btn-warning { background-color: #f39c12; }
        .btn-danger { background-color: #e74c3c; }
        .btn-secondary { background-color: #95a5a6; }
        
        .btn {
            padding: 12px 20px;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            text-decoration: none;
            display: inline-block;
            transition: opacity 0.3s ease;
        }
        
        .btn:hover {
            opacity: 0.9;
        }
        
        .btn-sm {
            padding: 8px 16px;
            font-size: 12px;
        }
        
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .alert-danger {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .btn-info {
            background-color: #17a2b8;
        }
        
        .reporte-card {
            background-color: white;
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stats-card {
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }
        
        .stats-card h3 {
            margin: 0 0 10px 0;
            font-size: 16px;
        }
        
        .stats-card p {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <!-- Navbar -->
        <div class="navbar">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2>🏥 Botica AMY</h2>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="color: var(--text-secondary);">Bienvenido, {{ Auth::user()->nombre_usuario }}</span>
                    <form method="POST" action="{{ route('logout') }}" style="margin: 0;">
                        @csrf
                        <button type="submit" style="
                            background-color: #e74c3c;
                            color: white;
                            border: none;
                            padding: 8px 16px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                        ">
                            🚪 Cerrar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Content Wrapper -->
        <div class="content-wrapper">
            <!-- Sidebar -->
            <div class="sidebar">
                <nav>
                    <ul style="list-style: none;">
                        <li style="margin-bottom: 10px;">
                            <a href="/dashboard" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                📊 Dashboard
                            </a>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <a href="/productos" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                💊 Productos
                            </a>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <a href="/clientes" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                👥 Clientes
                            </a>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <a href="/ventas" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                💰 Ventas
                            </a>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <a href="{{ route('reportes.index') }}" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                📊 Reportes
                            </a>
                        </li>
                        <li style="margin-bottom: 10px;">
                            <a href="{{ route('servicios.index') }}" style="text-decoration: none; color: var(--text-primary); padding: 10px; display: block; border-radius: 4px;">
                                🩺 Servicios
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <!-- Main Content -->
            <main class="main-content">
                <div class="fade-in">
                    @yield('content')
                </div>
            </main>
        </div>
    </div>
</body>
</html>
