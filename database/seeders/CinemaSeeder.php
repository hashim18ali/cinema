<?php

namespace Database\Seeders;

use App\Models\Cinema;
use Illuminate\Database\Seeder;

class CinemaSeeder extends Seeder
{
    public function run(): void
    {
        Cinema::insert([
            ['name' => 'Falcon Downtown Cinema', 'location' => '123 Main St'],
            ['name' => 'Fazaia Uptown Cinema', 'location' => '456 High St'],
        ]);
    }
}
