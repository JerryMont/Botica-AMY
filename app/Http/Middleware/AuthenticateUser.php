<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthenticateUser
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user()) {
            return response()->json([
                'status' => false,
                'message' => 'No autorizado'
            ], 401);
        }
        
        return $next($request);
    }
}
