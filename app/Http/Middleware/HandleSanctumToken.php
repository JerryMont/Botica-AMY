<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Log;

class HandleSanctumToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        
        if ($token) {
            try {
                $accessToken = PersonalAccessToken::findToken($token);
                
                if ($accessToken && $accessToken->tokenable) {
                    $request->setUserResolver(function () use ($accessToken) {
                        return $accessToken->tokenable;
                    });
                    Log::debug('Token válido encontrado para usuario: ' . $accessToken->tokenable->nombre_usuario);
                } else {
                    Log::debug('Token no encontrado o tokenable no disponible');
                }
            } catch (\Exception $e) {
                Log::error('Error al procesar token: ' . $e->getMessage());
            }
        } else {
            Log::debug('Sin token Bearer en la solicitud');
        }
        
        return $next($request);
    }
}
