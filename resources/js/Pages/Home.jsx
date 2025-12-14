import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { MapPin, Compass, Star, ArrowRight } from 'lucide-react';
import MainLayout from '@/Layouts/MainLayout';

export default function Home({ featuredDestinations = [] }) {
    const { url } = usePage();
    const containerRef = useRef(null);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-3xl"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, 50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"
                        animate={{
                            x: [0, -100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full px-4 py-12 md:py-20">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                            {...fadeInUp}
                        >
                            Discover <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Mindanao</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-300 mb-8"
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.2 }}
                        >
                            A Cultural Journey Through the Philippines' Pearl Island
                        </motion.p>

                        <motion.p
                            className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.4 }}
                        >
                            Explore stunning destinations, share your travel stories, and connect with fellow explorers.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            variants={fadeInUp}
                            initial="initial"
                            animate="animate"
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                href="/explore"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50 text-white font-semibold rounded-lg transition-all"
                            >
                                <Compass size={20} />
                                Explore Destinations
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold rounded-lg transition-all border border-white/20"
                            >
                                <MapPin size={20} />
                                Start Your Journey
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Destinations */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Destinations</h2>
                        <p className="text-gray-600 text-lg">Explore the most beautiful places in Mindanao</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {featuredDestinations.slice(0, 6).map((destination) => (
                            <motion.div
                                key={destination.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="group"
                            >
                                <Link href={`/destinations/${destination.slug}`}>
                                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-cyan-400">
                                            <img
                                                src={destination.image_url || 'https://via.placeholder.com/400x300?text=' + destination.name}
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
                                            <p className="text-gray-600 text-sm mb-4">{destination.region}</p>
                                            <p className="text-gray-700 text-sm flex-1 mb-4 line-clamp-2">{destination.description}</p>

                                            {destination.attractions && (
                                                <div className="mb-4">
                                                    <p className="text-xs font-semibold text-gray-600 mb-2">Top Attractions:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {destination.attractions.slice(0, 2).map((attr, idx) => (
                                                            <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                                {attr}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center text-blue-600 font-semibold group-hover:text-cyan-600 transition-colors">
                                                Learn More
                                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Link
                            href="/explore"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                        >
                            View All Destinations
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Why Explore With Us?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: 'Curated Destinations',
                                description: 'Carefully selected locations across Mindanao with detailed information and local insights.',
                            },
                            {
                                icon: Star,
                                title: 'Travel Diary',
                                description: 'Document your adventures with photos, ratings, and personal notes in your digital travel journal.',
                            },
                            {
                                icon: Compass,
                                title: 'Real-time Information',
                                description: 'Get current weather, nearby attractions, and local recommendations for each destination.',
                            },
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
                                        <Icon size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Ready to Share Your Story?
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/90 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Create an account and start documenting your Mindanao adventure today!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 font-bold rounded-lg transition-colors"
                        >
                            Join Now
                        </Link>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}

