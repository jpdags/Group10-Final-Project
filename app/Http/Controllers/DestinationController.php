<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class DestinationController extends Controller
{
    /**
     * Display all destinations
     */
    public function index()
    {
        $destinations = Cache::remember('destinations', 3600, function () {
            return Destination::all()->toArray();
        });

        return Inertia::render('Explore', [
            'destinations' => $destinations,
        ]);
    }

    /**
     * Display a single destination
     */
    public function show(Destination $destination)
    {
        // Get weather data
        $weather = Cache::remember("weather_{$destination->id}", 600, function () use ($destination) {
            return $this->getWeatherData($destination->latitude, $destination->longitude);
        });

        // Get nearby attractions from OpenTripMap
        $attractions = Cache::remember("attractions_{$destination->id}", 3600, function () use ($destination) {
            return $this->getNearbyAttractions($destination->latitude, $destination->longitude);
        });

        return Inertia::render('DestinationDetails', [
            'destination' => $destination->toArray(),
            'weather' => $weather,
            'attractions' => $attractions,
        ]);
    }

    /**
     * Fetch weather data from OpenWeather API
     */
    private function getWeatherData($lat, $lng)
    {
        try {
            $response = Http::get('https://api.openweathermap.org/data/2.5/weather', [
                'lat' => $lat,
                'lon' => $lng,
                'appid' => config('services.openweather.key'),
                'units' => 'metric',
            ]);

            return $response->json();
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Fetch nearby attractions from OpenTripMap API
     */
    private function getNearbyAttractions($lat, $lng)
    {
        try {
            $response = Http::get('https://api.opentripmap.com/0.2/en/places/nearby', [
                'lat' => $lat,
                'lon' => $lng,
                'radius' => 10000,
                'kinds' => 'interesting_places,museums,parks,restaurants',
                'apikey' => config('services.opentripmap.key'),
            ]);

            return collect($response->json()['features'] ?? [])->take(5)->toArray();
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Search destinations
     */
    public function search()
    {
        $query = request('query');

        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        $destinations = Destination::where('name', 'LIKE', "%{$query}%")
            ->orWhere('region', 'LIKE', "%{$query}%")
            ->select('id', 'name', 'slug', 'region', 'image_url')
            ->limit(10)
            ->get();

        return response()->json($destinations);
    }
}
