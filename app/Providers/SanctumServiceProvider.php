<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class SanctumServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Registrar el driver sanctum
        $this->app['auth']->extend('sanctum', function ($app, $name, array $config) {
            return new \Laravel\Sanctum\Guard(
                $app['auth.parsers.api_token'],
                $config['provider'] ?? null
            );
        });
    }
}
