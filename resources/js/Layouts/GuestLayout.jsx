import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
            </div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
                        <Map className="w-8 h-8" />
                        <span>Discover Mindanao</span>
                    </Link>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {children}
                </motion.div>

                {/* Footer Link */}
                <motion.p
                    className="mt-8 text-gray-300 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link href="/" className="text-white hover:text-purple-300 font-medium transition-colors">
                        Back to Home
                    </Link>
                </motion.p>
            </div>
        </div>
    );
}
