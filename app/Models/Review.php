<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = ['recipe_id', 'user_id', 'rating', 'comment'];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
