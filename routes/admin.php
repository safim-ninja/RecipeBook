<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RecipeController as AdminRecipeController;
//use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\AuthController;
use Inertia\Inertia;
Route::prefix('admin')->as('admin.')->group(function () {
    // Admin Authentication Routes
    Route::middleware('admin.guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });

    // Protected Admin Routes
    Route::middleware('admin')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard']);
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

        // User Management
        Route::get('/users/pending', [UserController::class, 'pending'])->name('users.pending');
        Route::post('/users/{id}/approve', [UserController::class, 'approve'])->name('users.approve');
        Route::post('/users/{id}/reject', [UserController::class, 'reject'])->name('users.reject');
        Route::resource('users', UserController::class);

        // Recipe Management
        Route::get('/recipes/pending', [AdminRecipeController::class, 'pending'])->name('recipes.pending');
        Route::post('/recipes/{id}/approve', [AdminRecipeController::class, 'approve'])->name('recipes.approve');
        Route::post('/recipes/{id}/reject', [AdminRecipeController::class, 'reject'])->name('recipes.reject');
        Route::resource('recipes', AdminRecipeController::class);

        // Category Management
        // Route::resource('categories', CategoryController::class);

        // Logout
        Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    }
    );
});
