<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Recipe;
use App\Models\Review;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class ProfileController extends Controller
{
    public function show(Request $request): Response
    {
        $myRecipes = Recipe::where('user_id', $request->user()->id)->get();
        $myReviews = Review::where('user_id', $request->user()->id)->get();
        return Inertia::render('User/Profile', [
            'user' => $request->user(),
            'myRecipes' => $myRecipes,
            'myReviews' => $myReviews,
        ]);
    }
    /**
     *
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        // dd($request->user()->avatar);
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class.',username,'.$user->id,
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class.',email,'.$user->id,
            'password' => ['confirmed'],
        ]);

        $user->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        if ($request->hasFile('avatar')) {
            if(Storage::exists($request->user()->avatar)) {
                unlink(public_path('/avatars/' . $request->user()->avatar));
             }
            $avatar = time() . '_' . $request->file('avatar')->getClientOriginalName();
            $request->file('avatar')->move(public_path('/avatars'), $avatar);
            $request->user()->avatar = $avatar;
        }
        $user->save();

        return redirect()->back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function user(Request $request, $username): Response
    {
        // $myRecipes = Recipe::where('user_id', $request->user()->id)->get();
        // $myReviews = Review::where('user_id', $request->user()->id)->get();
        // return Inertia::render('User/Profile', [
        //     'user' => $request->user(),
        //     'myRecipes' => $myRecipes,
        //     'myReviews' => $myReviews,
        // ]);
        $user = User::where('username', $username)->first();
        $recipes = Recipe::where('user_id', $user->id)->get();
        $reviews = Review::where('user_id', $user->id)->get();
        return Inertia::render('User/PublicProfile', ['user' => $user, 'recipes' => $recipes, 'reviews' => $reviews]);
    }
}
