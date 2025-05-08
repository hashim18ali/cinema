<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Film::with(['showtimes' => function ($query) {
            $query->with(['theater', 'bookings' => function ($query) {
                $query->select('showtime_id', 'num_tickets')->where('status', '!=', 'cancelled');
            }]);
        }])->get()->map(function ($movie) {
            $movie->showtimes_with_seats = $movie->showtimes->map(function ($showtime) {
                $totalSeats = $showtime->theater->capacity ?? 30;
                $ticketsBooked = $showtime->bookings->sum('num_tickets');
                $showtime->seats_left = max(0, $totalSeats - $ticketsBooked);
                return $showtime;
            });
            return $movie;
        })->toArray();

        return Inertia::render('Movies/Index', ['movies' => $movies]);
    }
}
