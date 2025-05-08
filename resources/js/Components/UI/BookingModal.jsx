import React from 'react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import InputError from '../InputError';

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
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl border border-gray-100"
            >
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="mb-6 text-xl font-bold text-gray-900"
                >
                    Book a Movie Ticket
                </motion.h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Movies & Showtime</label>
                        <select
                            name="showtime_id"
                            value={data.showtime_id}
                            onChange={handleChange}
                            className="mt-1 w-full rounded border text-black border-gray-300 p-2"
                        >
                            <option value="">Select a movie and time</option>
                            {showtimes?.map((showtime) => (
                                <option key={showtime.id} value={showtime.id}>
                                    🎬 {showtime?.film?.title} - 🕒 {new Date(showtime?.show_time).toLocaleString()}
                                </option>
                            ))}
                        </select>
                        {/* {errors.showtime_id && (
                            <div className="text-sm text-red-600 mt-1">{errors.showtime_id}</div>
                        )} */}
                        <InputError message={errors.showtime_id} className="mt-2" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tickets</label>
                        <input
                            type="number"
                            name="num_tickets"
                            value={data.num_tickets}
                            onChange={handleChange}
                            className="text-black bg-white border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    <InputError message={errors.num_tickets} className="mt-2" />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <motion.button
                            type="button"
                            onClick={() => setShowModal(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          
                            Cancel
                        </motion.button>
                        <motion.button
                            type="submit"
                            disabled={processing}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {processing ? (
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                            {processing ? 'Booking...' : 'Book Now'}
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default BookingModal;
