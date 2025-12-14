<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredDestinations = Destination::limit(6)->get();

        return Inertia::render('Home', [
            'featuredDestinations' => $featuredDestinations,
        ]);
    }
}
