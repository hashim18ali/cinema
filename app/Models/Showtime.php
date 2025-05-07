<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    use HasFactory;

    protected $fillable = ['film_id', 'theater_id', 'show_time'];

    public function seatsBooked()
{
    return $this->bookings()->sum('num_tickets');
}

    public function film()
    {
        return $this->belongsTo(Film::class)->select(['id', 'title', 'description']);
    }

    public function theater()
    {
        return $this->belongsTo(Theater::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}

