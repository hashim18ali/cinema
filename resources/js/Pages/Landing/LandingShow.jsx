import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MessageAlert from '@/Components/UI/MessageAlert';

const LandingShow = ({ auth, movies }) => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <>
            <MessageAlert />
            <Head title="Welcome to Cinema Booking" />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 pt-24 pb-32">
                    {loading ? (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
                            <p className="mt-4 text-xl text-gray-300">Loading movies...</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-24">
                                <h1 className="text-7xl font-extrabold mb-4 tracking-tighter">
                                    🎬 Welcome to <span className="text-red-500">Cinema Booking</span>
                                </h1>
                                <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                                    Your gateway to endless cinematic experiences. Book your favorite movies with just a few clicks.
                                </p>
                                
                                <div className="flex flex-wrap justify-center gap-6">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                        >
                                            Book Your Favourite Show
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                Log In
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                            >
                                                Register to Book
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-12">🎞 Box Office Hits</h2>

                            {movies?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {movies.map((movie) => (
                                        <div 
                                            key={movie.id} 
                                            className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                        >
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={`https://picsum.photos/seed/${movie.id}/600/400`}
                                                    alt={movie.title || 'Movie poster'}
                                                    className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3"></div>
                                            </div>
                                            
                                            <div className="p-6">
                                                <h2 className="text-2xl font-bold mb-3">{movie.title || 'Untitled Movie'}</h2>
                                                <p className="text-gray-300 mb-4 line-clamp-3">{movie.description || 'No description available'}</p>

                                                {movie.showtimes?.length > 0 && (
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold mb-3 text-white">Showtimes</h3>
                                                        <div className="flex flex-wrap gap-2">
                                                            {movie.showtimes.map((showtime) => (
                                                                <div
                                                                    key={showtime.id}
                                                                    className="flex items-center gap-2 bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors"
                                                                >
                                                                    <span>
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
                                                                    <span className="text-red-500">
                                                                        {showtime.seats_left} seats left
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-400 mt-12">
                                    <p className="text-2xl font-semibold mb-4">No movies available at the moment</p>
                                    <p className="text-gray-500">Check back soon for the latest releases!</p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Footer */}
                    <footer className="mt-24 pt-12 border-t border-gray-700 text-center text-sm text-gray-400">
                        <p>© 2025 Cinema Booking System | Built by{' '}
                            <span className="text-red-400 font-medium">3 Amigos Digital Innovation</span>
                        </p>
                        <p className="mt-2">All rights reserved</p>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default LandingShow;
