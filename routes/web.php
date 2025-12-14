<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\TravelDiaryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ApiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/explore', [DestinationController::class, 'index'])->name('explore');
Route::get('/destinations/{destination}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/api/destinations/search', [DestinationController::class, 'search'])->name('destinations.search');

// Cultural Guide & Map (Public)
Route::get('/cultural-guide', function () {
    return Inertia::render('CulturalGuide');
})->name('cultural-guide');

Route::get('/interactive-map', function () {
    return Inertia::render('InteractiveMap');
})->name('interactive-map');

// API Endpoints (Public)
Route::get('/api/philippines-info', [ApiController::class, 'getPhilippinesInfo']);
Route::get('/api/mindanao-stats', [ApiController::class, 'getMindanaoStats']);
Route::get('/api/cultural-info', [ApiController::class, 'getCulturalInfo']);

// Reviews (Public Read, Auth Write)
Route::get('/api/destinations/{destinationSlug}/reviews', [ReviewController::class, 'getDestinationReviews']);

// Protected Routes (Authenticated Users)
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Travel Diary - CRUD
    Route::resource('travel-diary', TravelDiaryController::class);

    // Wishlist - CRUD
    Route::resource('wishlist', WishlistController::class);
    Route::get('/api/wishlist/check/{destinationId}', [WishlistController::class, 'check']);

    // Reviews
    Route::post('/api/reviews', [ReviewController::class, 'store']);
    Route::patch('/api/reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('/api/reviews/{review}', [ReviewController::class, 'destroy']);
    Route::post('/api/reviews/{review}/helpful', [ReviewController::class, 'markHelpful']);
});

require __DIR__.'/auth.php';
