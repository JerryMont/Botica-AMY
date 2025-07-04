<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolMiddleware
{
    /**
     * Maneja una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $rol
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $rol): Response
    {
        $user = $request->user();
        if (!$user || $user->rol !== $rol) {
            return response()->json([
                'status' => false,
                'message' => 'No autorizado. Se requiere rol: ' . $rol,
                'data' => null
            ], 403);
        }
        return $next($request);
    }
} 