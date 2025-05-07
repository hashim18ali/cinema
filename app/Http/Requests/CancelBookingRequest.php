<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class CancelBookingRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|exists:users,id',
            'showtime_id' => 'required|exists:showtimes,id',
            'num_tickets' => 'required|integer|min:1|max:30',
            'booking_reference' => 'required|string|exists:bookings,booking_reference',
            'status' => 'required|in:cancelled,confirmed',

        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $showtimeId = $this->input('showtime_id');

            if ($showtimeId) {
                $showtime = DB::table('showtimes')->where('id', $showtimeId)->value('show_time');

                if ($showtime && Carbon::now()->greaterThanOrEqualTo(Carbon::parse($showtime)->subHour())) {
                    $validator->errors()->add('showtime_id', 'You can only cancel a booking at least 1 hour before the showtime.');
                }
            }
        });
    }
}
