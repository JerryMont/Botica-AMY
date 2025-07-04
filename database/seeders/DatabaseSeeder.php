<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(UsuarioSeeder::class);
        // Llama aquí a otros seeders, por ejemplo:
        // $this->call(UserSeeder::class);
    }
}