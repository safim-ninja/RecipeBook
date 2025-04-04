<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Recipe;

class RecipeApprovalNotification extends Notification
{
    use Queueable;

    protected $recipe;
    protected $status;
    protected $reason;

    public function __construct(Recipe $recipe, string $status, string $reason = null)
    {
        $this->recipe = $recipe;
        $this->status = $status;
        $this->reason = $reason;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $messages = [
            'approved' => "Your recipe \"{$this->recipe->title}\" has been approved and is now public",
            'rejected' => "Your recipe \"{$this->recipe->title}\" was not approved" . ($this->reason ? ". Reason: {$this->reason}" : ""),
            'pending' => "Your recipe \"{$this->recipe->title}\" is pending review"
        ];

        return [
            'message' => $messages[$this->status] ?? "Your recipe \"{$this->recipe->title}\" status has been updated to {$this->status}",
            'recipe_id' => $this->recipe->id,
            'recipe_slug' => $this->recipe->slug,
            'status' => $this->status,
            'reason' => $this->reason,
            'type' => 'recipe_approval'
        ];
    }
} 