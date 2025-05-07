<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Showtime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['user', 'showtime', 'showtime.film', 'showtime.theater', 'showtime.theater.cinema'])
            ->select([
                'id',
                'user_id',
                'showtime_id',
                'num_tickets',
                'booking_reference',
                'status'
            ])
            ->where([
                'status' => 'confirmed',
                'user_id' => $request->user()->id
            ])
            ->latest()
            ->get()
            ->toArray();

        $cancelledBookings = Booking::with(['user', 'showtime', 'showtime.film', 'showtime.theater', 'showtime.theater.cinema'])
            ->select([
                'id',
                'user_id',
                'showtime_id',
                'num_tickets',
                'booking_reference',
                'status'
            ])
            ->where([
                'status' => 'cancelled',
                'user_id' => $request->user()->id
            ])
            ->latest()
            ->get()
            ->toArray();

        $showtimes = Showtime::with(['film', 'theater', 'bookings'])
            ->select(['id', 'theater_id', 'film_id', 'show_time'])
            ->get()
            ->toArray();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings,
            'showtimes' => $showtimes,
            'cancelledBookings' => $cancelledBookings,
        ]);
    }

    public function store(StoreBookingRequest $request)
    {
        $validated = $request->validated();

        try {
            Booking::create([
                'user_id' => $request->user()->id,
                'showtime_id' => $validated['showtime_id'],
                'num_tickets' => $validated['num_tickets'],
                'booking_reference' => 'BR-' . strtoupper(Str::random(8)), 
                'status' => 'confirmed',
            ]);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Booking failed. ' . $e->getMessage());
        }

        return redirect()->route('bookings.index')->with('message', 'Booked successfully.');
    }


    public function cancelBooking(Booking $booking)
    {
        $booking->update([
            'status' => 'cancelled',
        ]);

        return redirect()->back()->with('success', 'Booking cancelled.');
    }
}
