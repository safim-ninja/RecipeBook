<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function canAddRecipe()
    {
        $recipeCount = $this->recipes()->count();
        $subscription = $this->subscription;

        if (!$subscription || $subscription->plan_type === 'free') {
            return $recipeCount < 3;
        }

        return true;
    }

    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, 'notifiable');
    }

    public function unreadNotifications()
    {
        return $this->morphMany(Notification::class, 'notifiable')->whereNull('read_at');
    }

    public function markAllNotificationsAsRead()
    {
        $this->notifications()->update(['read_at' => now()]);
    }

    public function markNotificationAsRead($id)
    {
        $notification = $this->notifications()->findOrFail($id);
        $notification->update(['read_at' => now()]);
    }

    public function getUnreadNotificationsCount()
    {
        return $this->unreadNotifications()->count();
    }   

    public function getNotifications()
    {
        return $this->notifications()->orderBy('created_at', 'desc')->get();
    }

    public function getUnreadNotifications()
    {
        return $this->unreadNotifications()->orderBy('created_at', 'desc')->get();
    }
}
