<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AddedItem implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private  $items;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($items)
    {
        $this->items = $items;
    }

    public function broadcastWith()
    {
        return [
            'items' => $this->items
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('channel');
    }
}