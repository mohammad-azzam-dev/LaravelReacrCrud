<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'waybill',
        'user_id',
        'customer_address',
        'customer_name',
    ];

    protected $casts = [
        'created_at' => "datetime:Y-m-d",
        'updated_at' => "datetime:Y-m-d",
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAuthUser($query)
    {
        $query->where('user_id', Auth::id());
    }


}
