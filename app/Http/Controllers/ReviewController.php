<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Get reviews for a destination
     */
    public function getDestinationReviews($destinationSlug)
    {
        $destination = Destination::where('slug', $destinationSlug)->firstOrFail();

        $reviews = $destination->reviews()
            ->with('user:id,name,email')
            ->approved()
            ->paginate(10);

        $stats = [
            'average_rating' => $destination->getAverageRating(),
            'total_reviews' => $destination->getReviewCount(),
            'rating_breakdown' => [
                5 => $destination->reviews()->where('rating', 5)->count(),
                4 => $destination->reviews()->where('rating', 4)->count(),
                3 => $destination->reviews()->where('rating', 3)->count(),
                2 => $destination->reviews()->where('rating', 2)->count(),
                1 => $destination->reviews()->where('rating', 1)->count(),
            ],
        ];

        return response()->json([
            'reviews' => $reviews,
            'stats' => $stats,
        ]);
    }

    /**
     * Store a new review
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'destination_id' => 'required|exists:destinations,id',
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|min:5|max:100',
            'content' => 'required|string|min:20|max:1000',
        ]);

        // Check if user already reviewed this destination
        $existing = Review::where('user_id', auth()->id())
            ->where('destination_id', $validated['destination_id'])
            ->exists();

        if ($existing) {
            return response()->json(['message' => 'You have already reviewed this destination'], 422);
        }

        $validated['user_id'] = auth()->id();
        $validated['helpful_count'] = 0;

        $review = Review::create($validated);

        return response()->json([
            'message' => 'Review created successfully!',
            'review' => $review->load('user'),
        ], 201);
    }

    /**
     * Update a review
     */
    public function update(Request $request, Review $review)
    {
        $this->authorize('update', $review);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|min:5|max:100',
            'content' => 'required|string|min:20|max:1000',
        ]);

        $review->update($validated);

        return response()->json([
            'message' => 'Review updated successfully!',
            'review' => $review,
        ]);
    }

    /**
     * Delete a review
     */
    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        $review->delete();

        return response()->json([
            'message' => 'Review deleted successfully!',
        ]);
    }

    /**
     * Mark review as helpful
     */
    public function markHelpful(Review $review)
    {
        $review->increment('helpful_count');

        return response()->json([
            'message' => 'Marked as helpful',
            'helpful_count' => $review->helpful_count,
        ]);
    }
}
