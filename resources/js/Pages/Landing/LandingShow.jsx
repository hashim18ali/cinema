import React from 'react';
import { Head, Link } from '@inertiajs/react';

const LandingShow = ({ auth, movies }) => {

    return (
        <>
            <Head title="Welcome to Cinema Booking" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 pt-12 pb-20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                        🎬 Welcome to <span className="text-red-500">Cinema Booking System</span>
                    </h1>

                    <p className="text-lg mb-12 text-gray-300">
                        Book your favorite movies online with ease — anywhere, anytime.
                    </p>

                    <h2 className="text-3xl font-bold mb-8">🎞 Box Office Hits</h2>

                    {movies?.length > 0 ? (
                        <div className="space-y-12">
                            {movies.map((movie) => (
                                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                                    <div className="md:flex">
                                        <div className="md:w-1/3">
                                            <img
                                                src={`https://picsum.photos/seed/${movie.id}/600/400`}
                                                alt={movie.title || 'Movie poster'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6 md:w-2/3">
                                            <h2 className="text-2xl font-bold mb-2">{movie.title || 'Untitled Movie'}</h2>
                                            <p className="text-gray-300 mb-4">{movie.description || 'No description available'}</p>

                                            {movie.showtimes?.length > 0 && (
                                                <div className="text-center mt-4">
                                                    <h3 className="text-lg font-semibold mb-4 text-white">Showtimes</h3>
                                                    <div className="flex flex-wrap justify-center gap-3">
                                                        {movie.showtimes.map((showtime) => (
                                                            <span
                                                                key={showtime.id}
                                                                className="inline-block bg-gray-700 text-gray-200 px-4 py-2 rounded-full text-sm shadow-md"
                                                            >
                                                                {new Date(showtime.show_time).toLocaleDateString(undefined, {
                                                                    weekday: 'short',
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}{' '}
                                                                -{' '}
                                                                {new Date(showtime.show_time).toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 mt-12">
                            No movies available at the moment.
                        </div>
                    )}

                    <div className="mt-16 flex justify-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
                            >
                                Book Your Favourite Show
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition"
                                >
                                    Register to Book
                                </Link>
                            </>
                        )}
                    </div>

                    <footer className="mt-16 text-sm text-gray-400">
                        © 2025 Cinema Booking System | Built by{' '}
                        <span className="text-red-400 font-medium">3 Amigos Digital Innovation</span>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default LandingShow;
