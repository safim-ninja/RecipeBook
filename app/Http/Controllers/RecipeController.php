<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::with('category')->with('user')->get();
        return Inertia::render('Recipe/Index', [
            'recipes' => $recipes
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $recipeCount = Recipe::where('user_id', $user->id)->count();

        // Check if user has reached free limit
        if ($recipeCount >= 3) {
            $subscription = $user->subscription;

            if (!$subscription || $subscription->plan_type === 'free') {
                return redirect()->back()->with('error', 'You have reached the free recipe limit. Please upgrade to Premium to add more recipes.');
            }
        }

        if($request->hasFile('image')){
            $imagePath = time().'.'.$request->image->getClientOriginalExtension();
            $request->image->move(public_path('recipes'), $imagePath);
        }
        // title	image	description	time	difficulty	chef	servings	ingredients	instructions	tags	slug	status	category_id	user_id
        $recipe = Recipe::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'time' => $request->time,
            'difficulty' => $request->difficulty,
            'chef' => $request->chef,
            'servings' => $request->servings,
            'ingredients' => json_encode(explode(',', $request->ingredients)),
            'instructions' => json_encode(explode(',', $request->instructions)),
            'tags' => json_encode(explode(',', $request->tags)),
            'status' => 0,
            'category_id' => $request->category_id,
            'user_id' => $user->id,
            'is_orderable' => $request->is_orderable,
            'image' => $imagePath,
        ]);
        return redirect()->back()->with('success', 'Recipe created successfully');
    }

    public function show($slug)
    {
        $recipe = Recipe::where('slug', $slug)->with('category')->with('user')->with('reviews')->first();
        return Inertia::render('Recipe', [
            'recipe' => $recipe
        ]);
    }

    public function edit($slug)
    {
        $recipe = Recipe::where('slug', $slug)->with('category')->with('user')->first();
        return Inertia::render('Recipe/Edit', [
            'recipe' => $recipe
        ]);
    }

    public function update(Request $request, $slug)
    {
        $recipe = Recipe::where('slug', $slug)->first();
        if(!$recipe){
            return redirect()->back()->with('error', 'Recipe not found');
        }
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'tags' => 'required|array',
            'tags.*' => 'string|max:255',
        ]);
        if($request->hasFile('image')){
            Storage::delete($recipe->image);
            $image = $request->file('image')->store('recipes', 'public');
        }
        $recipe->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'description' => $request->description,
            'time' => $request->time,
            'difficulty' => $request->difficulty,
            'servings' => $request->servings,
            'ingredients' => json_encode(explode(',', $request->ingredients)),
            'instructions' => json_encode(explode(',', $request->instructions)),
            'tags' => json_encode($request->tags),
            'category_id' => $request->category_id,
            'image' => $image,
            'is_orderable' => $request->is_orderable,
        ]);
        return redirect()->back()->with('success', 'Recipe updated successfully');
    }

    public function destroy($slug)
    {
        $recipe = Recipe::where('slug', $slug)->first();
        if(!$recipe){
            return redirect()->back()->with('error', 'Recipe not found');
        }
        $recipe->delete();
        return redirect()->back()->with('success', 'Recipe deleted successfully');
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $recipes = Recipe::whereRaw('LOWER(tags) like ?', ['%' . strtolower($query) . '%'])
        ->orWhere('title', 'like', '%' . $query . '%')
        ->with('category')
        ->get();
        return response()->json($recipes);
    }
    public function categoryWiseRecipes($categoryslug) {
        $category = Category::where('slug', $categoryslug)->first();
        $recipes = Recipe::where('category_id', $category->id)->with('category')->with('user')->get();
        return Inertia::render('Recipe/CategoryWiseRecipes', [
            'recipes' => $recipes,
            'category' => $category
        ]);
    }
}
