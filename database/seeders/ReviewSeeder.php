<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Review::create([
            'recipe_id' => 1,
            'user_id' => 1,
            'rating' => 5,
            'comment' => 'This pancake recipe is amazing! So fluffy and delicious.'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 1,
            'user_id' => 2,
            'rating' => 4,
            'comment' => 'Great recipe, but I added a bit more vanilla extract.'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 2,
            'user_id' => 1,
            'rating' => 5,
            'comment' => 'Perfect eggs benedict! The hollandaise sauce was spot on.'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 3,
            'user_id' => 3,
            'rating' => 3,
            'comment' => 'The avocado toast was good but needed more seasoning.'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 3,
            'user_id' => 2,
            'rating' => 5,
            'comment' => 'Love this healthy breakfast option!'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 5,
            'user_id' => 1,
            'rating' => 4,
            'comment' => 'The French toast was delicious. Will make again!'
        ]);

        \App\Models\Review::create([
            'recipe_id' => 5,
            'user_id' => 3,
            'rating' => 5,
            'comment' => 'Best French toast recipe I\'ve tried.'
        ]);

        // Note: Recipes 4 and 6 intentionally left without reviews for randomness
    }
}
