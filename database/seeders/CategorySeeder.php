<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Italian',
            'slug' => 'italian',
        ]);
        Category::create([
            'name' => 'Thai',
            'slug' => 'thai',
        ]);
        Category::create([
            'name' => 'American',
            'slug' => 'american',
        ]);
        Category::create([
            'name' => 'French',
            'slug' => 'french',
        ]);
        Category::create([
            'name' => 'Japanese',
            'slug' => 'japanese',
        ]);
        Category::create([
            'name' => 'Indian',
            'slug' => 'indian',
        ]);
        Category::create([
            'name' => 'Mexican',
            'slug' => 'mexican',
        ]);
    }
}
