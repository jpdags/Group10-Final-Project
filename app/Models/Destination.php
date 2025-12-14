<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'region',
        'latitude',
        'longitude',
        'image_url',
        'attractions',
        'best_time_to_visit',
    ];

    protected $casts = [
        'attractions' => 'json',
        'best_time_to_visit' => 'json',
    ];

    public function travelDiaries()
    {
        return $this->hasMany(TravelDiary::class);
    }

    public function wishlists()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Get average rating for destination
     */
    public function getAverageRating()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    /**
     * Get review count
     */
    public function getReviewCount()
    {
        return $this->reviews()->count();
    }

    /**
     * Get wishlist count
     */
    public function getWishlistCount()
    {
        return $this->wishlists()->count();
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
