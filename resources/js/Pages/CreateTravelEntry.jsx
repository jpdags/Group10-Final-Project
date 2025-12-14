import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, Link } from '@inertiajs/react';
import { Upload, ArrowLeft, Star } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function CreateTravelEntry({ destinations = [] }) {
    const { data, setData, post, errors, processing } = useForm({
        destination_id: '',
        notes: '',
        rating: 5,
        visit_date: '',
        photos: [],
    });

    const [previewPhotos, setPreviewPhotos] = useState([]);

    const handlePhotoSelect = (e) => {
        const files = Array.from(e.target.files);
        setData('photos', [...data.photos, ...files]);

        // Create previews
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewPhotos((prev) => [...prev, event.target.result]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removePhoto = (index) => {
        const newPhotos = data.photos.filter((_, i) => i !== index);
        const newPreviews = previewPhotos.filter((_, i) => i !== index);
        setData('photos', newPhotos);
        setPreviewPhotos(newPreviews);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('travel-diary.store'));
    };

    return (
        <MainLayout>
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href={route('travel-diary.index')}
                            className="inline-flex items-center justify-center w-12 h-12 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold">Create Travel Entry</h1>
                            <p className="text-gray-300 mt-2">Document your Mindanao adventure</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Form */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-xl shadow-lg p-8 space-y-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Destination Selection */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Destination</label>
                            <select
                                value={data.destination_id}
                                onChange={(e) => setData('destination_id', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                                    errors.destination_id
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-purple-500'
                                }`}
                            >
                                <option value="">Select a destination...</option>
                                {destinations.map((dest) => (
                                    <option key={dest.id} value={dest.id}>
                                        {dest.name} - {dest.region}
                                    </option>
                                ))}
                            </select>
                            {errors.destination_id && (
                                <p className="text-red-500 text-sm mt-2">{errors.destination_id}</p>
                            )}
                        </div>

                        {/* Visit Date */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Visit Date</label>
                            <input
                                type="date"
                                value={data.visit_date}
                                onChange={(e) => setData('visit_date', e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                                    errors.visit_date
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-purple-500'
                                }`}
                            />
                            {errors.visit_date && (
                                <p className="text-red-500 text-sm mt-2">{errors.visit_date}</p>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Rating</label>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        onClick={() => setData('rating', star)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="transition-transform"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${
                                                star <= data.rating
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Share your experience, memories, and thoughts about this destination..."
                                rows={6}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all ${
                                    errors.notes
                                        ? 'border-red-500 focus:ring-red-200'
                                        : 'border-gray-300 focus:border-purple-500'
                                }`}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-600">Minimum 10 characters</p>
                                <p className="text-sm text-gray-600">{data.notes.length} characters</p>
                            </div>
                            {errors.notes && (
                                <p className="text-red-500 text-sm mt-2">{errors.notes}</p>
                            )}
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-900 mb-3">Photos</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer"
                                onClick={() => document.getElementById('photo-input').click()}
                            >
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600 font-medium">Click to upload photos</p>
                                <p className="text-gray-500 text-sm">or drag and drop</p>
                                <input
                                    id="photo-input"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoSelect}
                                    className="hidden"
                                />
                            </div>

                            {/* Photo Previews */}
                            {previewPhotos.length > 0 && (
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {previewPhotos.map((preview, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="relative group"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <img
                                                src={preview}
                                                alt={`Preview ${idx + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removePhoto(idx)}
                                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ✕
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200">
                            <motion.button
                                type="submit"
                                disabled={processing}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
                            >
                                {processing ? 'Creating...' : 'Create Entry'}
                            </motion.button>
                            <Link
                                href={route('travel-diary.index')}
                                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-lg transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </motion.form>
                </div>
            </section>
        </MainLayout>
    );
}
