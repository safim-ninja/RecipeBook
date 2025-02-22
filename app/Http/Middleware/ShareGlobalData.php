<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use App\Models\Recipe;
use Illuminate\Support\Facades\Cache;

class ShareGlobalData
{
    public function handle($request, Closure $next)
    {
        // Cache popular tags for 1 hour to improve performance
        // $popularTags = Cache::remember('popular_tags', 3600, function () {
            $popularTags = Recipe::getPopularTags();
            // return $popularTags;
        // });

        Inertia::share([
            'popularTags' => [],
        ]);

        return $next($request);
    }
}
