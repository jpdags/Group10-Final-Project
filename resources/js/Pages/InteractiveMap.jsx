import React, { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Heart, Star } from 'lucide-react';
import axios from 'axios';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function InteractiveMap() {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/explore')
            .then(response => {
                // Fetch from API endpoint instead
                axios.get('/api/mindanao-stats')
                    .then(() => {
                        // Get destinations from the explore data
                        setDestinations(response.data.destinations || []);
                    });
            })
            .catch(error => console.error('Error fetching destinations:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full" />
                    </motion.div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Interactive Map" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-center"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <MapPin className="w-10 h-10 text-emerald-600" />
                            <h1 className="text-5xl font-bold text-gray-900">Mindanao Explorer Map</h1>
                        </div>
                        <p className="text-xl text-gray-600">Explore destinations, click markers to learn more</p>
                    </motion.div>

                    {/* Map Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden h-96 lg:h-full"
                        >
                            <MapContainer
                                center={[8.5, 123.5]}
                                zoom={7}
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; OpenStreetMap contributors'
                                />

                                {/* Sample Mindanao destinations */}
                                {[
                                    {
                                        id: 1,
                                        name: 'Davao City',
                                        lat: 7.0731,
                                        lng: 125.6121,
                                        region: 'Davao del Sur',
                                        description: 'City of Durian and Eagles',
                                    },
                                    {
                                        id: 2,
                                        name: 'Cagayan de Oro',
                                        lat: 8.4917,
                                        lng: 124.6289,
                                        region: 'Misamis Oriental',
                                        description: 'City of Golden Friendship',
                                    },
                                    {
                                        id: 3,
                                        name: 'Zamboanga City',
                                        lat: 6.9271,
                                        lng: 122.0724,
                                        region: 'Zamboanga del Sur',
                                        description: 'Pearl of the South',
                                    },
                                    {
                                        id: 4,
                                        name: 'Butuan City',
                                        lat: 8.9674,
                                        lng: 125.5269,
                                        region: 'Agusan del Norte',
                                        description: 'Gateway to Prosperity',
                                    },
                                    {
                                        id: 5,
                                        name: 'Iligan City',
                                        lat: 8.2256,
                                        lng: 124.2170,
                                        region: 'Lanao del Norte',
                                        description: 'City of Majestic Waterfalls',
                                    },
                                    {
                                        id: 6,
                                        name: 'General Santos City',
                                        lat: 6.1166,
                                        lng: 125.1833,
                                        region: 'South Cotabato',
                                        description: 'Tuna Capital of the Philippines',
                                    },
                                ].map((dest) => (
                                    <Marker
                                        key={dest.id}
                                        position={[dest.lat, dest.lng]}
                                        eventHandlers={{
                                            click: () => setSelectedDestination(dest),
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-2">
                                                <h3 className="font-bold text-gray-900">{dest.name}</h3>
                                                <p className="text-sm text-gray-600">{dest.description}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-xl shadow-lg p-8"
                        >
                            {selectedDestination ? (
                                <motion.div
                                    key={selectedDestination.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                            {selectedDestination.name}
                                        </h2>
                                        <p className="text-emerald-600 font-semibold flex items-center gap-2">
                                            <MapPin className="w-5 h-5" />
                                            {selectedDestination.region}
                                        </p>
                                    </div>

                                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg">
                                        <p className="text-gray-700 italic">
                                            "{selectedDestination.description}"
                                        </p>
                                    </div>

                                    <div className="flex gap-2 pt-4 border-t border-gray-200">
                                        <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2">
                                            <Heart className="w-5 h-5" />
                                            Add to Wishlist
                                        </button>
                                    </div>

                                    <Link
                                        href={`/destinations/${selectedDestination.name.toLowerCase().replace(/ /g, '-')}`}
                                        className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition"
                                    >
                                        View Full Details →
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center text-gray-600"
                                >
                                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p>Click on a marker on the map to view destination details</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Legend */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 bg-white rounded-xl shadow-lg p-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">About Mindanao</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border-l-4 border-emerald-600 pl-4">
                                <h4 className="font-bold text-gray-900 mb-2">Largest Island</h4>
                                <p className="text-gray-600">
                                    Mindanao is the second-largest island in the Philippines
                                </p>
                            </div>
                            <div className="border-l-4 border-blue-600 pl-4">
                                <h4 className="font-bold text-gray-900 mb-2">Natural Wonders</h4>
                                <p className="text-gray-600">
                                    Home to Mount Apo, the highest mountain in the Philippines
                                </p>
                            </div>
                            <div className="border-l-4 border-purple-600 pl-4">
                                <h4 className="font-bold text-gray-900 mb-2">Cultural Hub</h4>
                                <p className="text-gray-600">
                                    Rich diversity of indigenous tribes and traditions
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
