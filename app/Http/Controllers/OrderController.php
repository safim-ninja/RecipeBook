<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['items.recipe', 'chef'])
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders
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
        $request->validate([
            'chef_id' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.recipe_id' => 'required|exists:recipes,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;
        foreach ($request->items as $item) {
            $recipe = Recipe::findOrFail($item['recipe_id']);
            $total += $recipe->price * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'chef_id' => $request->chef_id,
            'total_amount' => $total,
            'status' => 'pending',
        ]);

        foreach ($request->items as $item) {
            $recipe = Recipe::findOrFail($item['recipe_id']);
            $order->items()->create([
                'recipe_id' => $recipe->id,
                'quantity' => $item['quantity'],
                'price' => $recipe->price,
            ]);
        }

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
