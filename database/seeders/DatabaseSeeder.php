<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Destination;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create Mindanao destinations
        Destination::create([
            'name' => 'Davao City',
            'slug' => 'davao-city',
            'description' => 'The Gateway to Mindanao, known for its eco-tourism and vibrant culture. Home to beautiful fruit plantations and friendly locals.',
            'region' => 'Davao',
            'latitude' => 7.0731,
            'longitude' => 125.6127,
            'image_url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'attractions' => ['Kadayawan Festival', 'Pearl Farm Beach Resort', 'Mount Apo', 'Eden Nature Park', 'Samal Island'],
            'best_time_to_visit' => ['December', 'January', 'February', 'March'],
        ]);

        Destination::create([
            'name' => 'Cagayan de Oro',
            'slug' => 'cagayan-de-oro',
            'description' => 'Adventure capital of the Philippines with world-class white water rafting and vibrant nightlife.',
            'region' => 'Misamis Oriental',
            'latitude' => 8.4866,
            'longitude' => 124.6451,
            'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
            'attractions' => ['White Water Rafting', 'Camiguin Island', 'Bukidnon Highlands', 'Museo de Oro', 'Pulang Lupa Falls'],
            'best_time_to_visit' => ['March', 'April', 'May'],
        ]);

        Destination::create([
            'name' => 'Zamboanga City',
            'slug' => 'zamboanga-city',
            'description' => 'Pearl of Mindanao, famous for its colorful stilt houses (Chavacano) and rich cultural heritage.',
            'region' => 'Zamboanga Peninsula',
            'latitude' => 6.9271,
            'longitude' => 122.0724,
            'image_url' => 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
            'attractions' => ['Great Mosque', 'Fort Pilar', 'Hermosa Festival', 'Boisao Island', 'Talikud Island'],
            'best_time_to_visit' => ['January', 'February', 'March'],
        ]);

        Destination::create([
            'name' => 'Marawi City',
            'slug' => 'marawi-city',
            'description' => 'The Islamic City of the Philippines, rich in Muslim heritage, mosques, and Islamic architecture.',
            'region' => 'Lanao del Sur',
            'latitude' => 8.0000,
            'longitude' => 124.2833,
            'image_url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'attractions' => ['Marawi City Mosque', 'Lake Lanao', 'Amai Pakpak Museum', 'Aseania Resort', 'Pala-o Falls'],
            'best_time_to_visit' => ['December', 'January', 'February'],
        ]);

        Destination::create([
            'name' => 'General Santos City',
            'slug' => 'general-santos-city',
            'description' => 'Tuna capital of the Philippines with pristine beaches and excellent seafood markets.',
            'region' => 'South Cotabato',
            'latitude' => 6.1184,
            'longitude' => 125.1925,
            'image_url' => 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
            'attractions' => ['Fish Port', 'Sarangani Bay', 'Kawa Kawa Beach', 'Magsaysay Park', 'Tambler Falls'],
            'best_time_to_visit' => ['March', 'April', 'May', 'June'],
        ]);

        Destination::create([
            'name' => 'Cotabato City',
            'slug' => 'cotabato-city',
            'description' => 'Historic city where the Rio Grande de Mindanao flows, known for cotton trading and rich history.',
            'region' => 'Maguindanao del Norte',
            'latitude' => 6.2222,
            'longitude' => 124.2383,
            'image_url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'attractions' => ['Cotabato Cathedral', 'Rio Grande de Mindanao', 'Sultan Kudarat Mosque', 'Nuestra Señora del Pilar Parish Church', 'Nia Waterfall'],
            'best_time_to_visit' => ['February', 'March', 'April'],
        ]);

        Destination::create([
            'name' => 'Butuan City',
            'slug' => 'butuan-city',
            'description' => 'Gateway to the Caraga Region and home to the Balangiga Bells Museum.',
            'region' => 'Agusan del Norte',
            'latitude' => 8.9667,
            'longitude' => 125.5333,
            'image_url' => 'https://images.unsplash.com/photo-1520814627789-26adf92efd8f?w=800',
            'attractions' => ['Balangiga Bells Museum', 'Butuan Barter Festival', 'Agusan Marsh Wildlife Sanctuary', 'Masao Falls', 'Ambuyog Falls'],
            'best_time_to_visit' => ['November', 'December', 'January'],
        ]);

        Destination::create([
            'name' => 'Iligan City',
            'slug' => 'iligan-city',
            'description' => 'City of Majestic Waterfalls with numerous cascading falls and industrial heritage.',
            'region' => 'Lanao del Norte',
            'latitude' => 8.2256,
            'longitude' => 124.2156,
            'image_url' => 'https://images.unsplash.com/photo-1432405972618-c60b0b51c1e7?w=800',
            'attractions' => ['Maria Cristina Falls', 'Tinago Falls', 'Alagad Falls', 'Camp Aguinaldo Beach', 'Cogon Mines'],
            'best_time_to_visit' => ['June', 'July', 'August'],
        ]);
    }
}

