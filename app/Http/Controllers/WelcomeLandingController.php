<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class WelcomeLandingController extends Controller
{
    public function index()
    {
        $movies = Film::with('showtimes')->get()->toArray();
        return Inertia::render('Landing/LandingShow', [
            'movies' => $movies,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
