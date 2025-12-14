<?php

namespace App\Http\Controllers;

use App\Models\TravelDiary;
use App\Models\Wishlist;
use App\Models\Review;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the user's dashboard with stats and recent activity
     */
    public function index()
    {
        $user = auth()->user();

        // Get stats
        $stats = [
            'total_diaries' => $user->travelDiaries()->count(),
            'total_wishlist' => $user->wishlists()->count(),
            'total_reviews' => $user->reviews()->count(),
            'destinations_visited' => $user->travelDiaries()->distinct('destination_id')->count(),
        ];

        // Get recent diaries
        $recentDiaries = $user->travelDiaries()
            ->with('destination')
            ->orderBy('visit_date', 'desc')
            ->limit(5)
            ->get();

        // Get wishlist items
        $wishlistItems = $user->wishlists()
            ->with('destination')
            ->orderBy('priority', 'desc')
            ->limit(6)
            ->get();

        // Get top-rated experiences
        $topRatedDiaries = $user->travelDiaries()
            ->with('destination')
            ->where('rating', '>=', 4)
            ->orderBy('rating', 'desc')
            ->limit(5)
            ->get();

        // Get quick stats for each region
        $regionStats = Destination::selectRaw('region, COUNT(*) as total_destinations')
            ->groupBy('region')
            ->orderBy('region')
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentDiaries' => $recentDiaries,
            'wishlistItems' => $wishlistItems,
            'topRatedDiaries' => $topRatedDiaries,
            'regionStats' => $regionStats,
            'user' => $user,
        ]);
    }
}
