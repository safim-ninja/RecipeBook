<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\Recipe;
use App\Models\Category;
class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $popularTags = Recipe::getPopularTags();
        // $trendingRecipes = Recipe::trendingRecipes();
        $popularCategories = Category::withCount('recipes')
            ->orderBy('recipes_count', 'desc')
            ->limit(5)
            ->get();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'popularTags' => $popularTags,
            // 'trendingRecipes' => $trendingRecipes,
            'popularCategories' => $popularCategories,
        ];
    }
}

