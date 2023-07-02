<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function update(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    public function destroy(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }

    public function show(User $user, Order $order): bool
    {
        return $user->id === $order->user_id;
    }


}
