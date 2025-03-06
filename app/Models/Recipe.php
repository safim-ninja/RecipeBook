<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function rating()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    public function totalReviews()
    {
        return $this->reviews()->count();
    }
    public static function getPopularTags($limit = 5)
    {
        // Get all recipes' tags
        $allTags = self::whereNotNull('tags')
            ->get()
            ->pluck('tags')
            ->map(function($tags) {
                return json_decode($tags);
            })
            ->flatten()
            ->countBy()
            ->sortDesc()
            ->take($limit)
            ->toArray();

        return $allTags;
    }

    // public static function trendingRecipes()
    // {
    //     return self::select('id', 'title', 'image')
    //         ->withAvg('reviews', 'rating')
    //         ->having('reviews_avg_rating', '>', 0)
    //         ->orderBy('reviews_avg_rating', 'desc')
    //         ->limit(3)
    //         ->get();
    // }
}
