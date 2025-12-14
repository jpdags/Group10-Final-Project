<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    /**
     * Display user's wishlist
     */
    public function index()
    {
        $wishlists = auth()->user()->wishlists()
            ->with('destination')
            ->orderBy('priority', 'desc')
            ->orderBy('added_at', 'desc')
            ->paginate(12);

        return Inertia::render('Wishlist', [
            'wishlists' => $wishlists,
        ]);
    }

    /**
     * Add destination to wishlist (AJAX)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'destination_id' => 'required|exists:destinations,id',
            'notes' => 'nullable|string|max:500',
            'priority' => 'nullable|integer|min:1|max:5',
            'planned_date' => 'nullable|date',
        ]);

        // Check if already in wishlist
        $exists = Wishlist::where('user_id', auth()->id())
            ->where('destination_id', $validated['destination_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Already in your wishlist'], 422);
        }

        $validated['user_id'] = auth()->id();

        $wishlist = Wishlist::create($validated);

        return response()->json([
            'message' => 'Added to your wishlist!',
            'wishlist' => $wishlist,
        ], 201);
    }

    /**
     * Update wishlist item
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        $this->authorize('update', $wishlist);

        $validated = $request->validate([
            'notes' => 'nullable|string|max:500',
            'priority' => 'nullable|integer|min:1|max:5',
            'planned_date' => 'nullable|date',
        ]);

        $wishlist->update($validated);

        return response()->json([
            'message' => 'Wishlist item updated!',
            'wishlist' => $wishlist,
        ]);
    }

    /**
     * Remove from wishlist
     */
    public function destroy(Wishlist $wishlist)
    {
        $this->authorize('delete', $wishlist);

        $destinationName = $wishlist->destination->name;
        $wishlist->delete();

        return response()->json([
            'message' => "Removed {$destinationName} from your wishlist",
        ]);
    }

    /**
     * Check if destination is in wishlist
     */
    public function check($destinationId)
    {
        $inWishlist = Wishlist::where('user_id', auth()->id())
            ->where('destination_id', $destinationId)
            ->exists();

        return response()->json(['inWishlist' => $inWishlist]);
    }
}
