import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import BookingModal from '@/Components/UI/BookingModal';
import MessageAlert from '@/Components/UI/MessageAlert';
import { motion } from 'framer-motion';

const Index = ({ showtimes, bookings, cancelledBookings }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('confirmed');
  const { put } = useForm();

  const handleCancel = (booking) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    put(route('cancel-booking', booking.id), {
      user_id: booking.user_id,
      showtime_id: booking.showtime.id,
      num_tickets: booking.num_tickets,
      booking_reference: booking.booking_reference,
      status: 'cancelled',
    }, {
      preserveScroll: true,
      onSuccess: () => console.log('Booking canceled'),
      onError: (errors) => console.error(errors),
    });
  };

  const renderBookingsTable = (bookingList, isCancelled = false) => (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <tr>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Booking Reference</th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Movie</th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Show Time</th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Num of Tickets</th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Cinema</th>
            <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Theater</th>
            {isCancelled ? (
              <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
            ) : (
              <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingList.map((booking, index) => (
            <motion.tr
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`hover:bg-gray-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                  </svg>
                  {booking.booking_reference}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking?.showtime?.film?.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(booking?.showtime?.show_time).toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.num_tickets}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking?.showtime?.theater?.cinema?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking?.showtime?.theater?.name}</td>
              {isCancelled ? (
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.status === 'cancelled' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <svg className="-ml-0.5 mr-1.5 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      <svg className="-ml-0.5 mr-1.5 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      -
                    </span>
                  )}
                </td>
              ) : (
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(booking)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Cancel
                  </motion.button>
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <AuthenticatedLayout>
      <MessageAlert/>
      <Head title="Bookings" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-6">

          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white-900">Your Bookings</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Book a Ticket
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b border-gray-200 relative overflow-hidden"
            >
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('confirmed')}
                  className={`relative whitespace-nowrap py-3 px-4 font-medium text-sm transition-all duration-200 ${activeTab === 'confirmed'
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <span>Confirmed</span>
                  {activeTab === 'confirmed' && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('cancelled')}
                  className={`relative whitespace-nowrap py-3 px-4 font-medium text-sm transition-all duration-200 ${activeTab === 'cancelled'
                    ? 'text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <span>Cancelled</span>
                  {activeTab === 'cancelled' && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                  )}
                </motion.button>
              </nav>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white shadow-lg rounded-lg"
          >
            <div className="p-6">
              {activeTab === 'confirmed' ? (
                bookings?.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No confirmed bookings found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't made any confirmed bookings yet.</p>
                  </div>
                ) : (
                  renderBookingsTable(bookings)
                )
              ) : (
                cancelledBookings?.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No cancelled bookings found</h3>
                    <p className="mt-1 text-sm text-gray-500">You haven't cancelled any bookings yet.</p>
                  </div>
                ) : (
                  renderBookingsTable(cancelledBookings, true)
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {showModal && (
        <BookingModal setShowModal={setShowModal} showtimes={showtimes} />
      )}
    </AuthenticatedLayout>
  );
};

export default Index;
