<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contents', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('excerpt')->nullable();
            $table->string('icon')->nullable();
            $table->string('link')->nullable();
            $table->string('img')->nullable();
            $table->text('body')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contents');
    }
};
