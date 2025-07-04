<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movimiento_stocks', function (Blueprint $table) {
            $table->id('id_movimiento');
            $table->unsignedBigInteger('id_producto');
            $table->enum('tipo', ['entrada', 'salida']);
            $table->integer('cantidad');
            $table->dateTime('fecha');
            $table->string('descripcion')->nullable();

            $table->foreign('id_producto')->references('id_producto')->on('productos');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movimiento_stocks');
    }
}; 