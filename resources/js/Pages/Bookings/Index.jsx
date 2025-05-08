import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import BookingModal from '@/Components/UI/BookingModal';
import MessageAlert from '@/Components/UI/MessageAlert';

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
    <table className="w-full table-auto border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">Booking Reference</th>
          <th className="border px-4 py-2 text-left">Movie</th>
          <th className="border px-4 py-2 text-left">Show Time</th>
          <th className="border px-4 py-2 text-left">Num of Tickets</th>
          <th className="border px-4 py-2 text-left">Cinema</th>
          <th className="border px-4 py-2 text-left">Theater</th>
          {isCancelled ? (
            <th className="border px-4 py-2 text-left">Status</th>
          ) : (
            <th className="border px-4 py-2 text-left">Actions</th>
          )}
        </tr>
      </thead>
      <tbody>
        {bookingList.map((booking) => (
          <tr key={booking.id}>
            <td className="border px-4 py-2">{booking.booking_reference}</td>
            <td className="border px-4 py-2">{booking?.showtime?.film?.title}</td>
            <td className="border px-4 py-2">{new Date(booking?.showtime?.show_time).toLocaleString()}</td>
            <td className="border px-4 py-2">{booking.num_tickets}</td>
            <td className="border px-4 py-2">{booking?.showtime?.theater?.cinema?.name}</td>
            <td className="border px-4 py-2">{booking?.showtime?.theater?.name}</td>
            {isCancelled ? (
              <td className="border px-4 py-2">
                {booking.status === 'cancelled' ? (
                  <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                    Cancelled
                  </span>
                ) : (
                  '-'
                )}
              </td>
            ) : (
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleCancel(booking)}
                  className="inline-block rounded-md bg-red-600 px-4 py-1.5 text-white font-semibold text-xs transition-all duration-200 hover:bg-red-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <AuthenticatedLayout>
      <MessageAlert/>
      <Head title="Bookings" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Bookings</h2>
            <button
              onClick={() => setShowModal(true)}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Book a Ticket
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 ${activeTab === 'confirmed'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-4 py-2 -mb-px text-sm font-medium border-b-2 ${activeTab === 'cancelled'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Cancelled
              </button>
            </nav>
          </div>

          {/* Bookings Table */}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              {activeTab === 'confirmed' ? (
                bookings?.length === 0 ? (
                  <p>No confirmed bookings found.</p>
                ) : (
                  renderBookingsTable(bookings)
                )
              ) : (
                cancelledBookings?.length === 0 ? (
                  <p>No cancelled bookings found.</p>
                ) : (
                  renderBookingsTable(cancelledBookings, true)
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <BookingModal setShowModal={setShowModal} showtimes={showtimes} />
      )}
    </AuthenticatedLayout>
  );
};

export default Index;
