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
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('image');
            $table->text('description');
            $table->string('time');
            $table->enum('difficulty', ['Easy', 'Medium', 'Hard']);
            $table->string('chef');
            $table->integer('servings');
            $table->json('ingredients');
            $table->json('instructions');
            $table->json('tags');
            $table->string('slug')->unique();
            $table->string('status')->default(1)->comment('1: active, 0: inactive');
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('user_id')->constrained('users');
            $table->boolean('is_orderable')->default(false);
            $table->decimal('price', 10, 2)->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
