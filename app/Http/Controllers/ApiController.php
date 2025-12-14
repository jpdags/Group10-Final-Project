<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ApiController extends Controller
{
    /**
     * Get Philippines country info from REST Countries API
     */
    public function getPhilippinesInfo()
    {
        return Cache::remember('philippines_info', 3600, function () {
            try {
                $response = Http::timeout(10)->get('https://restcountries.com/v3.1/name/Philippines');
                
                if ($response->successful()) {
                    $data = $response->json()[0];
                    return [
                        'name' => $data['name']['common'] ?? 'Philippines',
                        'official_name' => $data['name']['official'] ?? 'Republic of the Philippines',
                        'capital' => $data['capital'][0] ?? 'Manila',
                        'region' => $data['region'] ?? 'Asia',
                        'subregion' => $data['subregion'] ?? 'Southeast Asia',
                        'population' => $data['population'] ?? 0,
                        'area' => $data['area'] ?? 0,
                        'flag' => $data['flags']['svg'] ?? '',
                        'languages' => $data['languages'] ?? [],
                        'currencies' => $data['currencies'] ?? [],
                    ];
                }
            } catch (\Exception $e) {
                \Log::error('REST Countries API Error: ' . $e->getMessage());
            }

            return null;
        });
    }

    /**
     * Get regional statistics for Mindanao
     */
    public function getMindanaoStats()
    {
        return Cache::remember('mindanao_stats', 3600, function () {
            $stats = [
                'total_destinations' => Destination::count(),
                'total_regions' => Destination::distinct('region')->count(),
                'regions' => [],
                'attractions_count' => 0,
            ];

            $regions = Destination::selectRaw('region, COUNT(*) as count, COUNT(DISTINCT id) as destinations')
                ->groupBy('region')
                ->get();

            foreach ($regions as $region) {
                $stats['regions'][] = [
                    'name' => $region->region,
                    'destination_count' => $region->destinations,
                ];
            }

            return $stats;
        });
    }

    /**
     * Get cultural information about Mindanao
     */
    public function getCulturalInfo()
    {
        return Cache::remember('mindanao_cultural_info', 3600 * 24, function () {
            return [
                'tribes' => [
                    [
                        'name' => 'Maranao',
                        'region' => 'Lanao',
                        'description' => 'Known for intricate weaving and brass work',
                        'population' => '1.8 million',
                    ],
                    [
                        'name' => 'Maguindanao',
                        'region' => 'Maguindanao & Sultan Kudarat',
                        'description' => 'Skilled craftsmen and farmers',
                        'population' => '1.5 million',
                    ],
                    [
                        'name' => 'Tausug',
                        'region' => 'Sulu & Tawi-Tawi',
                        'description' => 'Traditional boat builders and traders',
                        'population' => '700,000',
                    ],
                    [
                        'name' => 'Sama-Bajau',
                        'region' => 'Coastal Areas',
                        'description' => 'Sea nomads known for diving skills',
                        'population' => '800,000',
                    ],
                ],
                'festivals' => [
                    [
                        'name' => 'Sinulog Festival',
                        'location' => 'Cebu (nearby)',
                        'month' => 'January',
                        'description' => 'Colorful procession honoring Santo Niño',
                    ],
                    [
                        'name' => 'Mindanao State Fair',
                        'location' => 'General Santos City',
                        'month' => 'October',
                        'description' => 'Celebrates Mindanao\'s culture and commerce',
                    ],
                    [
                        'name' => 'Kadayawan Festival',
                        'location' => 'Davao City',
                        'month' => 'August',
                        'description' => 'Thanksgiving festival celebrating harvest',
                    ],
                ],
                'cuisines' => [
                    [
                        'name' => 'Durian',
                        'region' => 'Davao City',
                        'description' => 'King of fruits - sweet, creamy, aromatic',
                    ],
                    [
                        'name' => 'Seafood',
                        'region' => 'Coastal Areas',
                        'description' => 'Fresh fish and shellfish specialties',
                    ],
                    [
                        'name' => 'Bicolano Dishes',
                        'region' => 'Various',
                        'description' => 'Pork adobo, sinigang, and local delicacies',
                    ],
                ],
            ];
        });
    }
}
