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
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('post_id');
            $table->integer('rating');
            $table->text('comment')->nullable();
            $table->timestamps();

            // TODO: change, use constrained
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onUpdate('cascade');
            $table->foreign('post_id')->references('id')->on('posts')->onUpdate('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
