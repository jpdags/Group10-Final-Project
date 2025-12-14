import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { motion } from 'framer-motion';
import { Heart, Trash2, Edit2, Calendar, AlertCircle } from 'lucide-react';
import axios from 'axios';

export default function Wishlist({ wishlists }) {
    const [items, setItems] = useState(wishlists.data || []);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

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
        exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove from wishlist?')) {
            setLoading(true);
            try {
                await axios.delete(`/wishlist/${id}`);
                setItems(items.filter(item => item.id !== id));
            } catch (error) {
                alert('Error removing item: ' + error.response?.data?.message || error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <MainLayout>
            <Head title="My Wishlist" />

            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-10 h-10 text-pink-600 fill-pink-600" />
                            <h1 className="text-5xl font-bold text-gray-900">My Wishlist</h1>
                        </div>
                        <p className="text-xl text-gray-600">Destinations you want to explore</p>
                    </motion.div>

                    {items.length > 0 ? (
                        <>
                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-pink-600"
                            >
                                <p className="text-gray-700">
                                    You have <span className="text-2xl font-bold text-pink-600">{items.length}</span> destinations in your wishlist
                                </p>
                            </motion.div>

                            {/* Wishlist Items Grid */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -5, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
                                    >
                                        {/* Card Header */}
                                        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold">{item.destination.name}</h3>
                                                    <p className="text-pink-100 mt-1">{item.destination.region}</p>
                                                </div>
                                                <div className="text-3xl">💖</div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <span className="inline-block bg-white text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Priority: {item.priority}/5
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="p-6">
                                            {item.notes && (
                                                <div className="mb-4">
                                                    <p className="text-sm text-gray-600 font-semibold mb-2">Notes</p>
                                                    <p className="text-gray-700">{item.notes}</p>
                                                </div>
                                            )}

                                            {item.planned_date && (
                                                <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                    <Calendar className="w-5 h-5" />
                                                    <span>{new Date(item.planned_date).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}</span>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                                <Link
                                                    href={route('destinations.show', item.destination.slug)}
                                                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={loading}
                                                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg font-semibold transition disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4 mx-auto" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    ) : (
                        /* Empty State */
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg p-12 text-center max-w-2xl mx-auto"
                        >
                            <Heart className="w-16 h-16 text-pink-300 mx-auto mb-6" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Wishlist Items Yet</h2>
                            <p className="text-gray-600 mb-8">
                                Start building your Mindanao adventure by adding destinations to your wishlist!
                            </p>
                            <Link
                                href={route('explore')}
                                className="inline-block bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg font-semibold transition"
                            >
                                Explore Destinations →
                            </Link>
                        </motion.div>
                    )}

                    {/* Back to Dashboard */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <Link
                            href={route('dashboard')}
                            className="text-pink-600 hover:text-pink-700 font-semibold"
                        >
                            ← Back to Dashboard
                        </Link>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
