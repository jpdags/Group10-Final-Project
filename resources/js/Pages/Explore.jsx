import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Compass, ArrowRight } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function Explore({ destinations = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dest.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !selectedRegion || dest.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    const regions = [...new Set(destinations.map(d => d.region))];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <MainLayout>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Mindanao</h1>
                    <p className="text-white/90 text-lg">Discover amazing destinations across the region</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Region Filter */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedRegion('')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    selectedRegion === ''
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                All Regions
                            </button>
                            {regions.map(region => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        selectedRegion === region
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <section className="py-12 px-4 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <p className="text-gray-600">
                            Showing <span className="font-bold">{filteredDestinations.length}</span> destination{filteredDestinations.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {filteredDestinations.length > 0 ? (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredDestinations.map(destination => (
                                <motion.div
                                    key={destination.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <Link href={`/destinations/${destination.slug}`}>
                                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer h-full flex flex-col">
                                            {/* Image */}
                                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-400">
                                                <img
                                                    src={destination.image_url || `https://via.placeholder.com/400x300?text=${destination.name}`}
                                                    alt={destination.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                    <span className="text-sm font-semibold">4.8</span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 flex flex-col flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                                                <div className="flex items-center text-gray-600 text-sm mb-4">
                                                    <MapPin size={16} className="mr-1" />
                                                    {destination.region}
                                                </div>
                                                <p className="text-gray-700 text-sm flex-1 mb-4 line-clamp-3">{destination.description}</p>

                                                {destination.attractions && destination.attractions.length > 0 && (
                                                    <div className="mb-4">
                                                        <p className="text-xs font-semibold text-gray-600 mb-2">Popular:</p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {destination.attractions.slice(0, 3).map((attr, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                                                                >
                                                                    {attr}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <Compass size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-600 text-lg">No destinations found. Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
