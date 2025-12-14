import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { MapPin, Cloud, Droplet, Wind, ArrowLeft } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function DestinationDetails({ destination, weather = null, attractions = [] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % 1);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + 1) % 1);
    };

    return (
        <MainLayout>
            {/* Header with Image */}
            <div className="relative h-96 md:h-screen overflow-hidden">
                <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    src={destination.image_url}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back Button */}
                <motion.div
                    className="absolute top-8 left-8 z-20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link
                        href={route('explore')}
                        className="inline-flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all"
                    >
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                </motion.div>

                {/* Title Overlay */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{destination.name}</h1>
                    <div className="flex items-center text-white text-lg">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{destination.region}</span>
                    </div>
                </motion.div>
            </div>

            {/* Content Section */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {/* Description */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">About</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">{destination.description}</p>
                            </div>

                            {/* Attractions */}
                            {destination.attractions && destination.attractions.length > 0 && (
                                <motion.div
                                    className="mb-12"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Attractions</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {destination.attractions.map((attraction, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100"
                                                whileHover={{ y: -2 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                <p className="text-lg text-gray-800 font-medium">{attraction}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Best Time to Visit */}
                            {destination.best_time_to_visit && destination.best_time_to_visit.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Time to Visit</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {destination.best_time_to_visit.map((month, idx) => (
                                            <motion.span
                                                key={idx}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {month}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {/* Location Card */}
                            <div className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl text-white">
                                <h3 className="text-xl font-bold mb-4">Location</h3>
                                <div className="space-y-2">
                                    <p className="flex justify-between">
                                        <span>Latitude:</span>
                                        <span className="font-mono">{destination.latitude.toFixed(4)}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span>Longitude:</span>
                                        <span className="font-mono">{destination.longitude.toFixed(4)}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Weather Card */}
                            {weather && (
                                <motion.div
                                    className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <h3 className="text-xl font-bold mb-4 flex items-center">
                                        <Cloud className="w-5 h-5 mr-2" />
                                        Current Weather
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="text-4xl font-bold">{Math.round(weather.main?.temp || 0)}°C</div>
                                        <p className="text-lg capitalize">{weather.weather?.[0]?.description || 'N/A'}</p>
                                        <div className="space-y-2 pt-3 border-t border-white/20">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center">
                                                    <Droplet className="w-4 h-4 mr-2" />
                                                    Humidity
                                                </span>
                                                <span>{weather.main?.humidity || 'N/A'}%</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center">
                                                    <Wind className="w-4 h-4 mr-2" />
                                                    Wind
                                                </span>
                                                <span>{weather.wind?.speed || 'N/A'} m/s</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Call to Action */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link
                                    href={route('travel-diary.create')}
                                    className="block w-full text-center px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                                >
                                    Add to Travel Diary
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Nearby Attractions from API */}
                    {attractions.length > 0 && (
                        <motion.div
                            className="mt-16 pt-16 border-t border-gray-200"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nearby Points of Interest</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {attractions.map((attraction, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                                        whileHover={{ y: -2 }}
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {attraction.properties?.name || 'Unnamed Location'}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3">
                                            {attraction.properties?.preview?.description || 'Interesting location'}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
