<?php

namespace App\Http\Controllers;

use App\Models\Showtime;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowtimeController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'cinema_id' => 'required|exists:cinemas,id',
            'film_id' => 'required|exists:films,id',
        ]);

        $showtimes = Showtime::where('cinema_id', $validated['cinema_id'])
                            ->where('film_id', $validated['film_id'])
                            ->get();

        return Inertia::render('Showtimes/Index', ['showtimes' => $showtimes]);
    }
}

