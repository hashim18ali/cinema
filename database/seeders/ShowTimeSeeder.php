<?php

namespace Database\Seeders;

use App\Models\Showtime;
use App\Models\Theater;
use App\Models\Film;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class ShowtimeSeeder extends Seeder
{
    public function run(): void
    {
        $films = Film::all();

        Theater::all()->each(function ($theater) use ($films) {
            $selectedFilms = $films->shuffle()->take(2);
            foreach ($selectedFilms as $index => $film) {
                Showtime::create([
                    'film_id' => $film->id,
                    'theater_id' => $theater->id,
                    'show_time' => Carbon::now()->addDays($index)->setTime(rand(12, 20), 0),
                ]);
            }
        });
    }
}
