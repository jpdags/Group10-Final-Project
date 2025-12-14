import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';
import { MapPin, Heart, Star, BookOpen, TrendingUp, Calendar, Award, Users } from 'lucide-react';

export default function Dashboard({ stats, recentDiaries, wishlistItems, topRatedDiaries, regionStats, user }) {
    const [activeTab, setActiveTab] = useState('overview');

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

    return (
        <AuthenticatedLayout header={<h2 className="text-3xl font-bold text-gray-900">My Mindanao Journey</h2>}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-8 shadow-lg"
                    >
                        <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 🌴</h1>
                        <p className="text-emerald-100 text-lg">
                            Continue your cultural journey through Mindanao's hidden gems
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        {/* Total Diaries */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500 hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">Travel Diaries</p>
                                    <p className="text-4xl font-bold text-emerald-600 mt-2">{stats.total_diaries}</p>
                                </div>
                                <BookOpen className="w-12 h-12 text-emerald-300" />
                            </div>
                            <Link
                                href={route('travel-diary.index')}
                                className="text-emerald-600 text-sm font-semibold mt-4 inline-flex items-center hover:text-emerald-700"
                            >
                                View All →
                            </Link>
                        </motion.div>

                        {/* Wishlist Items */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">Wishlist Items</p>
                                    <p className="text-4xl font-bold text-pink-600 mt-2">{stats.total_wishlist}</p>
                                </div>
                                <Heart className="w-12 h-12 text-pink-300" />
                            </div>
                            <Link
                                href={route('wishlist.index')}
                                className="text-pink-600 text-sm font-semibold mt-4 inline-flex items-center hover:text-pink-700"
                            >
                                View Wishlist →
                            </Link>
                        </motion.div>

                        {/* Destinations Visited */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">Destinations</p>
                                    <p className="text-4xl font-bold text-blue-600 mt-2">{stats.destinations_visited}</p>
                                </div>
                                <MapPin className="w-12 h-12 text-blue-300" />
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-semibold">Reviews</p>
                                    <p className="text-4xl font-bold text-yellow-600 mt-2">{stats.total_reviews}</p>
                                </div>
                                <Star className="w-12 h-12 text-yellow-300" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Tabs Navigation */}
                    <div className="flex gap-4 mb-8 flex-wrap">
                        {['overview', 'recent', 'wishlist', 'favorites'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg font-semibold transition ${
                                    activeTab === tab
                                        ? 'bg-emerald-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Regional Statistics */}
                                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Mindanao Regions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {regionStats.map((region) => (
                                            <motion.div
                                                key={region.region}
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-gradient-to-br from-emerald-50 to-blue-50 p-4 rounded-lg border border-emerald-200"
                                            >
                                                <p className="font-semibold text-gray-900">{region.region}</p>
                                                <p className="text-2xl font-bold text-emerald-600">{region.destinations}</p>
                                                <p className="text-xs text-gray-600 mt-1">destinations</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                                    <div className="space-y-4">
                                        <Link
                                            href={route('explore')}
                                            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition text-center"
                                        >
                                            Explore Mindanao
                                        </Link>
                                        <Link
                                            href={route('travel-diary.create')}
                                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                                        >
                                            Add Entry
                                        </Link>
                                        <Link
                                            href={route('cultural-guide')}
                                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-center"
                                        >
                                            Cultural Guide
                                        </Link>
                                        <Link
                                            href={route('interactive-map')}
                                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-center"
                                        >
                                            Interactive Map
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Recent Diaries Tab */}
                        {activeTab === 'recent' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Travel Entries</h3>
                                {recentDiaries.data?.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentDiaries.data.map((diary) => (
                                            <motion.div
                                                key={diary.id}
                                                whileHover={{ x: 5 }}
                                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition flex justify-between items-start"
                                            >
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {diary.destination.name}
                                                    </h4>
                                                    <p className="text-gray-600 mt-1">{diary.notes.substring(0, 100)}...</p>
                                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(diary.visit_date).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-500" />
                                                            {diary.rating}/5
                                                        </span>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={route('travel-diary.edit', diary.id)}
                                                    className="text-emerald-600 hover:text-emerald-700 font-semibold"
                                                >
                                                    Edit
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center py-8">No travel diaries yet. Start your journey!</p>
                                )}
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Wishlist</h3>
                                {wishlistItems.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {wishlistItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                whileHover={{ scale: 1.02 }}
                                                className="border border-pink-200 rounded-lg p-6 bg-pink-50"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-900">
                                                            {item.destination.name}
                                                        </h4>
                                                        <p className="text-gray-600 mt-1">{item.destination.region}</p>
                                                    </div>
                                                    <span className="text-xl font-bold text-pink-600">
                                                        {item.priority} ⭐
                                                    </span>
                                                </div>
                                                {item.notes && (
                                                    <p className="text-gray-700 mt-3 text-sm">{item.notes}</p>
                                                )}
                                                {item.planned_date && (
                                                    <p className="text-gray-600 mt-3 text-sm flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        Planned: {new Date(item.planned_date).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center py-8">
                                        No items in wishlist. Add your favorite destinations!
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Favorites Tab */}
                        {activeTab === 'favorites' && (
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Top-Rated Experiences</h3>
                                {topRatedDiaries.length > 0 ? (
                                    <div className="space-y-4">
                                        {topRatedDiaries.map((diary, index) => (
                                            <motion.div
                                                key={diary.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-lg"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-semibold text-gray-900">
                                                            {diary.destination.name}
                                                        </h4>
                                                        <p className="text-gray-600 mt-1">{diary.notes}</p>
                                                    </div>
                                                    <div className="text-center bg-yellow-400 text-gray-900 rounded-full w-16 h-16 flex items-center justify-center font-bold text-2xl">
                                                        {diary.rating}⭐
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center py-8">
                                        Rate your experiences to see them here!
                                    </p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
