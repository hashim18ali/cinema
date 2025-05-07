<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShowtimeController;
use App\Http\Controllers\WelcomeLandingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [WelcomeLandingController::class, 'index'])->name('home');
Route::get('/dashboard', [MovieController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('bookings', BookingController::class)->only(['index', 'store']);
    Route::post('showtimes', [ShowtimeController::class, 'index'])->name('showtimes.index');
    Route::put('cancel-booking/{booking}', [BookingController::class, 'cancelBooking'])->name('cancel-booking');
});

require __DIR__.'/auth.php';
