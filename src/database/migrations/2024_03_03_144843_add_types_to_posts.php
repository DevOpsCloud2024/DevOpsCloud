<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('post_type', function (Blueprint $table) {
            $table->foreignId('post_id');
            $table->foreignId('type_id');
        });

        Schema::create('labels', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('label_post', function (Blueprint $table) {
            $table->foreignId('post_id');
            $table->foreignId('label_id');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types');
        Schema::dropIfExists('post_types');

        Schema::dropIfExists('labels');
        Schema::dropIfExists('label_post');
    }
};
