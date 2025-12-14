<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'destination_id',
        'rating',
        'title',
        'content',
        'helpful_count',
    ];

    protected $casts = [
        'rating' => 'integer',
        'helpful_count' => 'integer',
    ];

    /**
     * Get the user who wrote the review
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the destination being reviewed
     */
    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    /**
     * Scope to get approved reviews ordered by helpfulness
     */
    public function scopeApproved($query)
    {
        return $query->orderBy('helpful_count', 'desc')
            ->orderBy('created_at', 'desc');
    }
}
