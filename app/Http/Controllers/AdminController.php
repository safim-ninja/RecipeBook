<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $total_users = User::count();
        $pending_users = User::where('status', 0)->count();
        $total_recipes = Recipe::count();
        $pending_recipes = Recipe::where('status', 0)->count();
        return Inertia::render('Admin/Dashboard',
            [
                'totalUsers' => $total_users,
                'pendingUsers' => $pending_users,
                'totalRecipes' => $total_recipes,
                'pendingRecipes' => $pending_recipes,
                'status' => 'success'
            ]);
    }
}
