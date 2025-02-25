<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recipe;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recipes = Recipe::with('category', 'user')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Recipes/Index', [
            'recipes' => $recipes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();
        return Redirect::route('admin.recipes.index');
    }

    /**
     * Display a listing of pending recipes.
     */
    public function pending()
    {
        // dd('pending');
        $recipes = Recipe::with('category', 'user')
            ->where('status', 0)
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Recipes/Pending', [
            'recipes' => $recipes
        ]);
    }

    /**
     * Approve a pending recipe.
     */
    public function approve(string $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->update(['status' => 1]);

        return redirect()->back()->with('success', 'Recipe approved successfully');
    }

    /**
     * Reject a pending recipe.
     */
    public function reject(string $id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->update(['status' => 2]);

        return redirect()->back()->with('success', 'Recipe rejected successfully');
    }
}
