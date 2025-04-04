<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\Order;

class OrderNotification extends Notification
{
    use Queueable;

    protected $order;
    protected $status;

    public function __construct(Order $order, string $status)
    {
        $this->order = $order;
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        $messages = [
            'pending' => "New order received (#" . $this->order->order_number . ")",
            'processing' => "Your order #" . $this->order->order_number . " is being processed",
            'completed' => "Your order #" . $this->order->order_number . " has been completed",
            'cancelled' => "Your order #" . $this->order->order_number . " has been cancelled"
        ];

        return [
            'message' => $messages[$this->status] ?? "Order #" . $this->order->order_number . " status updated to " . $this->status,
            'order_id' => $this->order->id,
            'order_number' => $this->order->order_number,
            'status' => $this->status,
            'type' => 'order_update'
        ];
    }
}