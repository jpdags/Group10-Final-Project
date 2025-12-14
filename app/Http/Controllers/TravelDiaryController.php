<?php

namespace App\Http\Controllers;

use App\Models\TravelDiary;
use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TravelDiaryController extends Controller
{
    /**
     * Display all travel diaries for the user
     */
    public function index()
    {
        $diaries = auth()->user()->travelDiaries()
            ->with('destination')
            ->orderBy('visit_date', 'desc')
            ->paginate(12);

        return Inertia::render('TravelDiary', [
            'diaries' => $diaries,
        ]);
    }

    /**
     * Show the form for creating a new travel diary
     */
    public function create()
    {
        $destinations = Destination::select('id', 'name', 'slug', 'region')->get();

        return Inertia::render('CreateTravelEntry', [
            'destinations' => $destinations,
        ]);
    }

    /**
     * Store a newly created travel diary
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'destination_id' => 'required|exists:destinations,id',
            'notes' => 'required|string|min:10',
            'rating' => 'required|integer|min:1|max:5',
            'visit_date' => 'required|date',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|file|image|max:5120',
        ]);

        $photos = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('travel-photos', 'public');
                $photos[] = $path;
            }
        }

        $validated['photos'] = $photos;
        $validated['user_id'] = auth()->id();

        TravelDiary::create($validated);

        return redirect()->route('travel-diary.index')->with('success', 'Travel entry created successfully!');
    }

    /**
     * Display the specified travel diary
     */
    public function show(TravelDiary $travelDiary)
    {
        $this->authorize('view', $travelDiary);

        return Inertia::render('TravelDiaryDetail', [
            'diary' => $travelDiary->load('destination'),
        ]);
    }

    /**
     * Show the form for editing the specified travel diary
     */
    public function edit(TravelDiary $travelDiary)
    {
        $this->authorize('update', $travelDiary);

        $destinations = Destination::select('id', 'name', 'slug', 'region')->get();

        return Inertia::render('EditTravelEntry', [
            'diary' => $travelDiary,
            'destinations' => $destinations,
        ]);
    }

    /**
     * Update the specified travel diary
     */
    public function update(Request $request, TravelDiary $travelDiary)
    {
        $this->authorize('update', $travelDiary);

        $validated = $request->validate([
            'destination_id' => 'required|exists:destinations,id',
            'notes' => 'required|string|min:10',
            'rating' => 'required|integer|min:1|max:5',
            'visit_date' => 'required|date',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|file|image|max:5120',
        ]);

        $photos = $travelDiary->photos ?? [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('travel-photos', 'public');
                $photos[] = $path;
            }
        }

        $validated['photos'] = $photos;
        $travelDiary->update($validated);

        return redirect()->route('travel-diary.index')->with('success', 'Travel entry updated successfully!');
    }

    /**
     * Remove the specified travel diary
     */
    public function destroy(TravelDiary $travelDiary)
    {
        $this->authorize('delete', $travelDiary);

        $travelDiary->delete();

        return redirect()->route('travel-diary.index')->with('success', 'Travel entry deleted successfully!');
    }
}
