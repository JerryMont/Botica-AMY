<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class HandleSanctumToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        
        if ($token) {
            $accessToken = PersonalAccessToken::findToken($token);
            
            if ($accessToken && $accessToken->tokenable) {
                $request->setUserResolver(function () use ($accessToken) {
                    return $accessToken->tokenable;
                });
            }
        }
        
        return $next($request);
    }
}
