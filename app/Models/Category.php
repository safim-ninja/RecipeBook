<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Recipe;

class Category extends Model
{
    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }
}
