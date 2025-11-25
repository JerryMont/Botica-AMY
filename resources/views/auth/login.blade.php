@extends('layouts.auth')

@section('title', 'Login - Botica AMY')

@section('content')
<div class="auth-card">
    <div class="auth-header">
        <h1>🏥 Botica AMY</h1>
        <p>Sistema de Gestión</p>
    </div>

    <form method="POST" action="{{ route('login') }}">
        @csrf
        
        @if ($errors->has('login'))
            <div class="alert alert-danger">
                {{ $errors->first('login') }}
            </div>
        @endif

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <div class="form-group">
            <label for="nombre_usuario">Usuario</label>
            <input 
                type="text" 
                id="nombre_usuario" 
                name="nombre_usuario" 
                class="form-control" 
                value="{{ old('nombre_usuario') }}" 
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
@endsection
