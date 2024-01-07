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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('avatar')->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('designation');
            $table->string('email')->unique();
            $table->string('password');
            $table->tinyInteger('user_type')->default(3)->comment('1.Admin  2.Manager  3.Employee');
            $table->string('phone')->nullable();
            $table->tinyInteger('gender')->nullable();
            $table->integer('reset_code')->nullable();
            $table->string('remember_token')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
