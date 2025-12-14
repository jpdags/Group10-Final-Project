import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { Users, Music, Utensils, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';

export default function CulturalGuide() {
    const [culturalData, setCulturalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('tribes');

    useEffect(() => {
        axios.get('/api/cultural-info')
            .then(response => {
                setCulturalData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cultural data:', error);
                setLoading(false);
            });
    }, []);

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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full" />
                    </motion.div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Cultural Guide" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">Mindanao's Cultural Heritage</h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the rich traditions, vibrant festivals, and diverse cuisines that make Mindanao unique
                        </p>
                    </motion.div>

                    {/* Navigation Tabs */}
                    <div className="flex justify-center gap-4 mb-12 flex-wrap">
                        {[
                            { id: 'tribes', label: 'Indigenous Tribes', icon: Users },
                            { id: 'festivals', label: 'Festivals', icon: Music },
                            { id: 'cuisines', label: 'Cuisines', icon: Utensils },
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                                        activeTab === tab.id
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Sections */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Tribes */}
                        {activeTab === 'tribes' && culturalData?.tribes && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {culturalData.tribes.map((tribe, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-600"
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{tribe.name}</h3>
                                        <div className="flex items-center gap-2 text-purple-600 mb-4">
                                            <MapPin className="w-5 h-5" />
                                            <span className="font-semibold">{tribe.region}</span>
                                        </div>
                                        <p className="text-gray-700 mb-4">{tribe.description}</p>
                                        <div className="bg-purple-50 px-4 py-2 rounded-lg">
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Population:</span> {tribe.population}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Festivals */}
                        {activeTab === 'festivals' && culturalData?.festivals && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {culturalData.festivals.map((festival, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-indigo-600 hover:shadow-xl transition"
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{festival.name}</h3>
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center gap-2 text-indigo-600">
                                                <MapPin className="w-5 h-5" />
                                                <span className="font-semibold">{festival.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-indigo-600">
                                                <Calendar className="w-5 h-5" />
                                                <span className="font-semibold">{festival.month}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{festival.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {/* Cuisines */}
                        {activeTab === 'cuisines' && culturalData?.cuisines && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {culturalData.cuisines.map((cuisine, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-600 hover:shadow-xl transition"
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{cuisine.name}</h3>
                                        <div className="flex items-center gap-2 text-orange-600 mb-4">
                                            <MapPin className="w-5 h-5" />
                                            <span className="font-semibold">{cuisine.region}</span>
                                        </div>
                                        <p className="text-gray-700">{cuisine.description}</p>
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <p className="text-sm text-gray-600 italic">🍽️ Must-try when visiting!</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-12 text-center"
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to Experience Mindanao's Culture?</h2>
                        <p className="text-lg text-purple-100 mb-8">
                            Start your journey and create memories in these culturally rich destinations
                        </p>
                        <a
                            href={route('explore')}
                            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition"
                        >
                            Explore Now →
                        </a>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
