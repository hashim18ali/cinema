<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StoreBookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'showtime_id' => 'required|',
            'num_tickets' => 'required|integer|min:1|max:30',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $showtimeId = $this->input('showtime_id');
            $numTickets = (int) $this->input('num_tickets');

            if ($showtimeId && $numTickets) {
                $seatsBooked = DB::table('bookings')
                    ->where('showtime_id', $showtimeId)
                    ->sum('num_tickets');

                $remainingSeats = 30 - $seatsBooked;

                if ($numTickets > $remainingSeats) {
                    $validator->errors()->add('num_tickets', "Only {$remainingSeats} seat(s) left for this showtime.");
                }
            }
        });
    }
}

