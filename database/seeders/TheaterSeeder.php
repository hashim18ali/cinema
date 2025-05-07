<?php

namespace Database\Seeders;

use App\Models\Cinema;
use App\Models\Theater;
use Illuminate\Database\Seeder;

class TheaterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cinema::all()->each(function ($cinema) {
            Theater::insert([
                ['cinema_id' => $cinema->id, 'name' => 'Theater 1', 'seats' => 30],
                ['cinema_id' => $cinema->id, 'name' => 'Theater 2', 'seats' => 30],
            ]);
        });
    }
}
