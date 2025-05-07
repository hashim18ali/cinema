<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CinemaSeeder::class,
            FilmSeeder::class,
            TheaterSeeder::class,
            ShowTimeSeeder::class,
        ]);
        Artisan::call('cache:clear');
    }
}
