<?php

use Inertia\Inertia;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;

Route::get('/dashboard', function () {
    return redirect()->route('profile.show');
//    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/subscribe', [SubscriptionController::class, 'create'])->name('subscription.create');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order_number}', [OrderController::class, 'details'])->name('orders.details');
    Route::get('/orders/{order_number}/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
    Route::post('/orders/{order_number}/payment', [OrderController::class, 'processPayment'])->name('orders.process-payment');
    
    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
});


require __DIR__.'/auth.php';

Route::get('/', function () {
    $recipes = Recipe::with('category')->with('user')->latest()->get();
    return Inertia::render('Home', [
        'recipes' => $recipes,
    ]);
})->name('home');

Route::group(['middleware' => ['auth', 'admin'], 'prefix' => 'admin'], function() {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    // other admin routes...
});

Route::post('/recipe', [RecipeController::class, 'store'])->name('recipe.store');
Route::get('/recipes/search', [RecipeController::class, 'search'])->name('recipes.search');
Route::get('/recipe/{slug}', [RecipeController::class, 'show'])->name('recipe.show');
Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/recipe/{slug}/edit', [RecipeController::class, 'edit'])->name('recipe.edit');
    Route::put('/recipe/{slug}', [RecipeController::class, 'update'])->name('recipe.update');
    Route::delete('/recipe/{slug}', [RecipeController::class, 'destroy'])->name('recipe.destroy');
});

// Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
Route::get('/profile/{username}', [ProfileController::class, 'user'])->name('user.profile');
Route::get('/category/{categoryslug}', [RecipeController::class, 'categoryWiseRecipes'])->name('category.recipes');


// Admin Routes
require __DIR__.'/admin.php';
