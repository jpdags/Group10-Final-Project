import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useForm } from '@inertiajs/react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function TravelDiary({ diaries = {} }) {
    const [selectedDiary, setSelectedDiary] = useState(null);
    const { delete: destroy } = useForm();

    const handleDelete = (diaryId) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            destroy(route('travel-diary.destroy', diaryId));
        }
    };

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

    const diaryList = diaries.data || diaries;

    return (
        <MainLayout>
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Travel Diary</h1>
                            <p className="text-xl text-gray-300">
                                {diaryList.length} {diaryList.length === 1 ? 'entry' : 'entries'}
                            </p>
                        </div>
                        <Link
                            href={route('travel-diary.create')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            New Entry
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <section className="py-16 px-4 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {diaryList.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {diaryList.map((diary) => (
                                <motion.div
                                    key={diary.id}
                                    variants={itemVariants}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Destination Image */}
                                    {diary.destination?.image_url && (
                                        <div className="relative h-48 overflow-hidden bg-gray-200">
                                            <img
                                                src={diary.destination.image_url}
                                                alt={diary.destination.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Destination Name */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {diary.destination?.name || 'Unknown Destination'}
                                        </h3>

                                        {/* Date and Rating */}
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                            <span className="text-sm text-gray-600">
                                                {new Date(diary.visit_date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-lg ${
                                                            i < diary.rating ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">{diary.notes}</p>

                                        {/* Photos Count */}
                                        {diary.photos && diary.photos.length > 0 && (
                                            <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
                                                <div className="w-4 h-4 rounded-full bg-purple-600" />
                                                {diary.photos.length} photo{diary.photos.length !== 1 ? 's' : ''}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                                            <Link
                                                href={route('travel-diary.edit', diary.id)}
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(diary.id)}
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Plus className="w-12 h-12 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Travel Entries Yet</h2>
                            <p className="text-gray-600 mb-8">Start documenting your Mindanao adventures!</p>
                            <Link
                                href={route('travel-diary.create')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create First Entry
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
