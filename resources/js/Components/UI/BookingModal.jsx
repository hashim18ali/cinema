import React from 'react';
import { useForm } from '@inertiajs/react';

const BookingModal = ({ setShowModal, showtimes }) => {

    const { data, setData, processing, post, errors } = useForm({
        showtime_id: '',
        num_tickets: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bookings.store'),
            {
                onSuccess: () => setShowModal(false),
                onError: () => {
                    console.error(errors);
                },
                preserveState: true,
                preserveScroll: true,
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-lg font-semibold">Book a Movie Ticket</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Showtime</label>
                        <select
                            name="showtime_id"
                            value={data.showtime_id}
                            onChange={handleChange}
                            className="mt-1 w-full rounded border border-gray-300 p-2"
                        >
                            <option value="">Select a movie and time</option>
                            {showtimes?.map((showtime) => (
                                <option key={showtime.id} value={showtime.id}>
                                    🎬 {showtime?.film?.title} - 🕒 {new Date(showtime?.show_time).toLocaleString()}
                                </option>
                            ))}
                        </select>
                        {errors.showtime_id && (
                            <div className="text-sm text-red-600 mt-1">{errors.showtime_id}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Num of Tickets</label>
                        <input
                            type="number"
                            name="num_tickets"
                            min="1"
                            max="30"
                            value={data.num_tickets}
                            onChange={handleChange}
                            className="-1 w-full rounded border border-gray-300 p-2"
                            placeholder="Number of tickets"
                        />
                        {errors.num_tickets && (
                            <div className="text-sm text-red-600 mt-1">{errors.num_tickets}</div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            disabled={processing}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
