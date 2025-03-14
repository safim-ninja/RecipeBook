<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

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

    function generateUniqueOrderId() {
        do {
            $orderId = 'ORD-' . random_int(100000, 999999);
        } while (Order::where('order_number', $orderId)->exists());

        return $orderId;
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
            // 'order_number' => 'ORD-' . str_pad(Order::count() + 1, 6, '0', STR_PAD_LEFT),
            'order_number' => $this->generateUniqueOrderId(),
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

    public function details($order_number)
    {
        $order = Order::where('order_number', $order_number)->with(['items.recipe', 'chef', 'user'])->first();

        return Inertia::render('Orders/Detail', [
            'order' => $order
        ]);
    }

    public function checkout($order_number)
    {
        $order = Order::where('order_number', $order_number)->with(['items.recipe', 'chef', 'user'])->first();

        return Inertia::render('Orders/Checkout', [
            'order' => $order
        ]);
    }

    public function processPayment(Request $request, $order_number)
    {
        $request->validate([
            'payment_method' => 'required|in:card,paypal',
            'card_number' => 'required_if:payment_method,card',
            'expiry_month' => 'required_if:payment_method,card|numeric|min:1|max:12',
            'expiry_year' => 'required_if:payment_method,card|numeric|min:23|max:99',
            'cvv' => 'required_if:payment_method,card|numeric|min:100|max:9999',
            'name_on_card' => 'required_if:payment_method,card',
            'billing_address' => 'required_if:payment_method,card',
            'city' => 'required_if:payment_method,card',
            'postal_code' => 'required_if:payment_method,card',
        ]);

        $order = Order::where('order_number', $order_number)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($order->status !== 'pending') {
            return back()->with('error', 'This order has already been processed.');
        }

        try {
            // Here you would typically integrate with a payment processor
            // For example, using Stripe:
            // $payment = Stripe::charges()->create([
            //     'amount' => $order->total_amount,
            //     'currency' => 'USD',
            //     'source' => $request->stripeToken,
            //     'description' => "Payment for order {$order->order_number}",
            // ]);

            // For now, we'll just simulate a successful payment
            $order->update([
                'status' => 'paid',
                'payment_method' => $request->payment_method,
                'paid_at' => now(),
            ]);

            // You might want to send confirmation emails here
            // Mail::to($order->user->email)->send(new OrderConfirmation($order));

            return redirect()->route('orders.details', $order->order_number)
                ->with('success', 'Payment processed successfully!');
        } catch (\Exception $e) {
            return back()->with('error', 'Payment processing failed. Please try again.');
        }
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
