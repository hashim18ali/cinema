import MessageAlert from '@/Components/UI/MessageAlert';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
        <MessageAlert />
            <Head title="Welcome to Cinema Booking" />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-4">
                <div className="max-w-4xl w-full text-center">
                    <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                        🎬 Welcome to <span className="text-red-500">Cinema Booking System</span>
                    </h1>

                    <p className="text-lg mb-10 text-gray-300">
                        Book your favorite movies online with ease — anywhere, anytime.
                    </p>

                    <div className="flex justify-center gap-6 mb-10">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition"
                            >
                                Browse Movies
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
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <footer className="mt-10 text-sm text-gray-400">
                        © 2025 Cinema Booking System | Built by <span className="text-red-400 font-medium">3 Amigos Digital Innovation</span>
                    </footer>
                </div>
            </div>
        </>
    );
}
