<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $recipes = [
            [
                'title' => 'Classic Spaghetti Carbonara',
                'image' => 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
                'description' => 'A traditional Italian pasta dish made with eggs, cheese, pancetta and black pepper.',
                'time' => '30 minutes',
                'difficulty' => 'Medium',
                'chef' => 'Mario Rossi',
                'servings' => 4,
                'ingredients' => json_encode(['400g spaghetti', '200g pancetta', '4 eggs', '100g pecorino cheese', 'Black pepper']),
                'instructions' => json_encode(['Cook pasta', 'Fry pancetta', 'Mix eggs and cheese', 'Combine all ingredients']),
                'slug' => 'classic-spaghetti-carbonara',
                'category_id' => 1,
                'user_id' => 1,
                'tags' => json_encode(['Italian', 'Pasta', 'Dinner'])
            ],
            [
                'title' => 'Thai Green Curry',
                'image' => 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd',
                'description' => 'A fragrant Thai curry with coconut milk, vegetables and chicken.',
                'time' => '45 minutes',
                'difficulty' => 'Medium',
                'chef' => 'Sarah Wong',
                'servings' => 6,
                'ingredients' => json_encode(['Green curry paste', 'Coconut milk', 'Chicken', 'Thai basil', 'Bamboo shoots']),
                'instructions' => json_encode(['Cook curry paste', 'Add coconut milk', 'Add chicken', 'Simmer until done']),
                'slug' => 'thai-green-curry',
                'category_id' => 2,
                'user_id' => 1,
                'tags' => json_encode(['Thai', 'Curry', 'Dinner'])
            ],
            [
                'title' => 'Classic Beef Burger',
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
                'description' => 'Juicy homemade beef burger with all the trimmings.',
                'time' => '25 minutes',
                'difficulty' => 'Easy',
                'chef' => 'John Smith',
                'servings' => 4,
                'ingredients' => json_encode(['Ground beef', 'Burger buns', 'Lettuce', 'Tomato', 'Cheese']),
                'instructions' => json_encode(['Form patties', 'Grill burgers', 'Add cheese', 'Assemble burger']),
                'slug' => 'classic-beef-burger',
                'category_id' => 3,
                'user_id' => 2,
                'tags' => json_encode(['American', 'Burger', 'Dinner'])
            ],
            [
                'title' => 'Chocolate Lava Cake',
                'image' => 'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
                'description' => 'Decadent chocolate dessert with a gooey center.',
                'time' => '20 minutes',
                'difficulty' => 'Medium',
                'chef' => 'Emma Baker',
                'servings' => 2,
                'ingredients' => json_encode(['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour']),
                'instructions' => json_encode(['Melt chocolate', 'Mix ingredients', 'Pour in ramekins', 'Bake']),
                'slug' => 'chocolate-lava-cake',
                'category_id' => 4,
                'user_id' => 2,
                'tags' => json_encode(['Dessert', 'Chocolate', 'Dinner'])
            ],
            [
                'title' => 'Fresh Summer Salad',
                'image' => 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
                'description' => 'Light and refreshing salad perfect for summer days.',
                'time' => '15 minutes',
                'difficulty' => 'Easy',
                'chef' => 'Lisa Green',
                'servings' => 4,
                'ingredients' => json_encode(['Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Avocado', 'Vinaigrette']),
                'instructions' => json_encode(['Wash vegetables', 'Chop ingredients', 'Make dressing', 'Combine and serve']),
                'slug' => 'fresh-summer-salad',
                'category_id' => 5,
                'user_id' => 1,
                'tags' => json_encode(['Salad', 'Summer', 'Dinner'])
            ],
            [
                'title' => 'Chicken Tikka Masala',
                'image' => 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
                'description' => 'Creamy and spicy Indian curry with tender chicken pieces.',
                'time' => '60 minutes',
                'difficulty' => 'Hard',
                'chef' => 'Raj Patel',
                'servings' => 6,
                'ingredients' => json_encode(['Chicken', 'Yogurt', 'Tomatoes', 'Cream', 'Spices']),
                'instructions' => json_encode(['Marinate chicken', 'Make sauce', 'Cook chicken', 'Combine and simmer']),
                'slug' => 'chicken-tikka-masala',
                'category_id' => 2,
                'user_id' => 2,
                'tags' => json_encode(['Indian', 'Chicken', 'Dinner'])
            ],
            [
                'title' => 'Classic French Croissants',
                'image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a',
                'description' => 'Buttery and flaky French pastries.',
                'time' => '3 hours',
                'difficulty' => 'Hard',
                'chef' => 'Pierre Dubois',
                'servings' => 8,
                'ingredients' => json_encode(['Flour', 'Butter', 'Yeast', 'Milk', 'Sugar']),
                'instructions' => json_encode(['Make dough', 'Laminate', 'Shape', 'Bake']),
                'slug' => 'classic-french-croissants',
                'category_id' => 4,
                'user_id' => 1,
                'tags' => json_encode(['French', 'Pastry', 'Breakfast'])
            ],
            [
                'title' => 'Vegetable Stir Fry',
                'image' => 'https://images.unsplash.com/photo-1512058564366-18510be2db19',
                'description' => 'Quick and healthy vegetable stir fry with soy sauce.',
                'time' => '20 minutes',
                'difficulty' => 'Easy',
                'chef' => 'Ming Chen',
                'servings' => 4,
                'ingredients' => json_encode(['Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger', 'Oil']),
                'instructions' => json_encode(['Prep vegetables', 'Heat wok', 'Stir fry', 'Season and serve']),
                'slug' => 'vegetable-stir-fry',
                'category_id' => 5,
                'user_id' => 2,
                'tags' => json_encode(['Vegetarian', 'Stir Fry', 'Lunch'])
            ],
            [
                'title' => 'Homemade Pizza',
                'image' => 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
                'description' => 'Classic Italian pizza with homemade dough and toppings.',
                'time' => '90 minutes',
                'difficulty' => 'Medium',
                'chef' => 'Giuseppe Romano',
                'servings' => 4,
                'ingredients' => json_encode(['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil', 'Olive oil']),
                'instructions' => json_encode(['Make dough', 'Prepare sauce', 'Add toppings', 'Bake']),
                'slug' => 'homemade-pizza',
                'category_id' => 1,
                'user_id' => 1,
                'tags' => json_encode(['Italian', 'Pizza', 'Dinner'])
            ],
            [
                'title' => 'Beef Wellington',
                'image' => 'https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1',
                'description' => 'Classic British dish of beef wrapped in pastry.',
                'time' => '120 minutes',
                'difficulty' => 'Hard',
                'chef' => 'Gordon Ramsay',
                'servings' => 6,
                'ingredients' => json_encode(['Beef tenderloin', 'Puff pastry', 'Mushrooms', 'Prosciutto', 'Herbs']),
                'instructions' => json_encode(['Sear beef', 'Make mushroom duxelles', 'Wrap in pastry', 'Bake']),
                'slug' => 'beef-wellington',
                'category_id' => 3,
                'user_id' => 2,
                'tags' => json_encode(['British', 'Beef', 'Dinner'])
            ]
        ];

        foreach ($recipes as $recipe) {
            Recipe::create($recipe);
        }
    }
}
