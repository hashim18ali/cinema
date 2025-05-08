<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\Showtime;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            DB::transaction(function () use ($validated, $request) {
                $showtime = Showtime::lockForUpdate()->find($validated['showtime_id']);

                $seatsBooked = $showtime->bookings()->active()->sum('num_tickets');
                $remainingSeats = 30 - $seatsBooked;

                if ($validated['num_tickets'] > $remainingSeats) {
                    throw new \Exception("Only {$remainingSeats} seat(s) left for this showtime.");
                }

                Booking::create([
                    'user_id' => $request->user()->id,
                    'showtime_id' => $validated['showtime_id'],
                    'num_tickets' => $validated['num_tickets'],
                    'booking_reference' => 'BR-' . strtoupper(Str::random(8)),
                    'status' => 'confirmed',
                ]);
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Booking failed. ' . $e->getMessage());
        }

        return redirect()->route('bookings.index')->with('success', 'Booked successfully.');
    }


    public function cancelBooking(Booking $booking)
    {
        $showTime = Carbon::parse($booking->showtime->show_time);
        $now = Carbon::now();
        $oneHourBeforeShow = $showTime->copy()->subHour();

        if ($now->greaterThan($oneHourBeforeShow)) {
            return redirect()->back()->with('error', 'You can only cancel a booking at least 1 hour before the show time.');
        }
        $booking->update([
            'status' => 'cancelled',
        ]);

        return redirect()->back()->with('success', 'Booking cancelled.');
    }
}
