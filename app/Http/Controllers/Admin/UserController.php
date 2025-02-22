<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::latest()
            ->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function pending()
    {
        $users = User::where('status', 0)
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Users/Pending', [
            'users' => $users
        ]);
    }

    public function approve(string $id)
    {
        $user = User::findOrFail($id);
        $user->update(['status' => 1]);

        return redirect()->back()->with('success', 'User approved successfully');
    }

    public function reject(string $id)
    {
        $user = User::findOrFail($id);
        $user->update(['status' => 2]);

        return redirect()->back()->with('success', 'User rejected successfully');
    }
}
