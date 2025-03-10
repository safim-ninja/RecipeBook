<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        return Inertia::render('Subscription/Index', [
            'currentSubscription' => auth()->user()->subscription
        ]);
    }

    public function create(Request $request)
    {
        $validator = $request->validate([
            'plan_type' => 'required|in:free,premium',
            'billing_period' => 'required|in:monthly,yearly'
        ]);


        $user = auth()->user();
        $currentSubscription = $user->subscription;
        dd($currentSubscription);

        // If user already has a subscription, update it
        if ($currentSubscription) {
            $currentSubscription->update([
                'plan_type' => $request->plan_type,
                'expires_at' => $this->calculateExpiryDate($request->billing_period)
            ]);
        } else {
            // Create new subscription
            Subscription::create([
                'user_id' => $user->id,
                'plan_type' => $request->plan_type,
                'expires_at' => $this->calculateExpiryDate($request->billing_period)
            ]);
        }

        // Here you would typically integrate with a payment processor like Stripe
        // for premium subscriptions

        return redirect()->back()->with('success', 'Subscription updated successfully!');
    }

    private function calculateExpiryDate($billingPeriod)
    {
        if ($billingPeriod === 'yearly') {
            return now()->addYear();
        }
        return now()->addMonth();
    }
}
