<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        // Si ya está autenticado, redirigir al dashboard
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
        
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'nombre_usuario' => 'required|string',
            'password' => 'required|string',
        ]);

        // Buscar usuario por nombre_usuario
        $usuario = Usuario::where('nombre_usuario', $request->nombre_usuario)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return back()->withErrors([
                'login' => 'Credenciales inválidas',
            ])->withInput($request->only('nombre_usuario'));
        }

        // Autenticar al usuario
        Auth::login($usuario);

        // Redirigir según el rol del usuario
        if ($usuario->rol === 'admin') {
            return redirect()->route('dashboard');
        } else {
            return redirect()->route('productos.index');
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('login');
    }
}
