<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Recipe;
use App\Models\User;

class RecipeCommentNotification extends Notification
{
    use Queueable;

    protected $recipe;
    protected $commenter;

    public function __construct(Recipe $recipe, User $commenter)
    {
        $this->recipe = $recipe;
        $this->commenter = $commenter;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "{$this->commenter->name} commented on your recipe \"{$this->recipe->title}\"",
            'recipe_id' => $this->recipe->id,
            'recipe_slug' => $this->recipe->slug,
            'commenter_id' => $this->commenter->id,
            'type' => 'recipe_comment'
        ];
    }
} 