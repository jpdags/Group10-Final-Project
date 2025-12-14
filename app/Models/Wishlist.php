<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'destination_id',
        'notes',
        'priority', // 1-5 (1=low, 5=high)
        'planned_date',
        'added_at'
    ];

    protected $casts = [
        'planned_date' => 'date',
        'added_at' => 'timestamp',
    ];

    /**
     * Get the user that owns the wishlist item
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the destination for this wishlist item
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Scope to get user's wishlist ordered by priority
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId)
            ->orderBy('priority', 'desc')
            ->orderBy('added_at', 'desc');
    }
}
