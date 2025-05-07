import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Index = ({ movies }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Movies" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-6 text-center">🎬 Available Movies</h1>
                    {movies.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {movies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
                                >
                                    <img
                                        src={`https://picsum.photos/seed/${movie.id}/400/250`}
                                        alt={movie.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                                            {movie.title}
                                        </h2>
                                        <p className="text-gray-600 mb-3 line-clamp-3">
                                            {movie.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-12">
                            No movies available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
