<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Film::select(['title', 'description'])->get()->toArray();
        return Inertia::render('Movies/Index', ['movies' => $movies]);
    }
}
