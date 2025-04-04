<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Recipe;
use App\Models\User;

class RecipeLikeNotification extends Notification
{
    use Queueable;

    protected $recipe;
    protected $liker;

    public function __construct(Recipe $recipe, User $liker)
    {
        $this->recipe = $recipe;
        $this->liker = $liker;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "{$this->liker->name} liked your recipe \"{$this->recipe->title}\"",
            'recipe_id' => $this->recipe->id,
            'recipe_slug' => $this->recipe->slug,
            'liker_id' => $this->liker->id,
            'type' => 'recipe_like'
        ];
    }
} 