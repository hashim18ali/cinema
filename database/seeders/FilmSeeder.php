<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;

class FilmSeeder extends Seeder
{
    public function run(): void
    {
        Film::insert([
            ['title' => 'You', 'description' => '2018 ‧ Thriller ‧ 5 seasons'],
            ['title' => 'Money Heist', 'description' => '2017 ‧ Thriller ‧ 5 seasons'],
            ['title' => 'Incidious The Last Key', 'description' => '2018 ‧ Horror/Mystery ‧ 1h 43m'],
            ['title' => 'The Dark Knight', 'description' => '2008 ‧ Action/Crime ‧ 2h 32m'],
        ]);
    }
}
