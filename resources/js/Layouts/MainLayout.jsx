import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Map, BookOpen, Settings, Accessibility } from 'lucide-react';
import AccessibilityPanel from '@/Components/AccessibilityPanel';
import TextSizeAdjuster, { useTextSize } from '@/Components/TextSizeAdjuster';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [accessibilityOpen, setAccessibilityOpen] = useState(false);
    useTextSize(); // Initialize text size hook

    const navItems = [
        { name: 'Home', href: route('home') },
        { name: 'Explore', href: route('explore') },
        { name: 'Interactive Map', href: route('interactive-map') },
        { name: 'Cultural Guide', href: route('cultural-guide') },
    ];

    const userMenuItems = [
        { name: 'Dashboard', href: route('dashboard'), icon: BookOpen },
        { name: 'My Travel Diary', href: route('travel-diary.index'), icon: BookOpen },
        { name: 'My Wishlist', href: route('wishlist.index'), icon: BookOpen },
        { name: 'Settings', href: route('profile.edit'), icon: Settings },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <motion.nav
                className="sticky top-0 z-50 bg-white border-b-4 border-gray-300 shadow-lg"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between min-h-[70px]">
                        {/* Logo */}
                        <Link 
                            href={route('home')} 
                            className="flex items-center gap-2 font-bold text-2xl text-purple-600 hover:text-purple-700 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-2 py-2"
                            aria-label="Discover Mindanao - Home"
                        >
                            <Map className="w-8 h-8" aria-hidden="true" />
                            <span className="hidden sm:inline text-lg">Mindanao</span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-lg font-semibold text-gray-900 hover:text-purple-600 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-3 py-2 transition-colors"
                                    aria-label={item.name}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Accessibility Button */}
                            <button
                                onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                                className="p-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                aria-label={`Accessibility settings ${accessibilityOpen ? 'open' : 'closed'}`}
                                aria-expanded={accessibilityOpen}
                                title="Open accessibility settings"
                            >
                                <Accessibility className="w-6 h-6" aria-hidden="true" />
                            </button>

                            {auth.user ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-900">{auth.user.name}</span>
                                    </div>
                                    <div className="relative group">
                                        <button 
                                            className="px-6 py-3 text-lg font-semibold text-gray-900 hover:text-purple-600 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg transition-colors"
                                            aria-haspopup="menu"
                                            aria-expanded="false"
                                            title="Open user menu"
                                        >
                                            Menu
                                        </button>
                                        <motion.div
                                            className="absolute right-0 mt-2 w-56 bg-white border-2 border-gray-300 rounded-lg shadow-lg invisible group-hover:visible z-50"
                                            role="menu"
                                            initial={{ opacity: 0, y: -10 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                        >
                                            {userMenuItems.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-900 hover:bg-purple-100 first:rounded-t-lg last:rounded-b-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                                    role="menuitem"
                                                >
                                                    <item.icon className="w-5 h-5" aria-hidden="true" />
                                                    {item.name}
                                                </Link>
                                            ))}
                                            <button
                                                onClick={() => {
                                                    document.getElementById('logout-form')?.submit();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-base font-semibold text-red-600 hover:bg-red-100 rounded-b-lg transition-colors border-t-2 border-gray-300 focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                                role="menuitem"
                                                title="Sign out of your account"
                                            >
                                                <LogOut className="w-5 h-5" aria-hidden="true" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-lg font-semibold text-gray-900 hover:text-purple-600 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-3 py-2 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none min-h-[44px] flex items-center justify-center"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={() => setAccessibilityOpen(!accessibilityOpen)}
                                className="p-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                aria-label="Accessibility settings"
                                title="Open accessibility settings"
                            >
                                <Accessibility className="w-6 h-6" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-3 hover:bg-gray-100 rounded-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-900" aria-hidden="true" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-900" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Accessibility Panel - Desktop */}
                    {accessibilityOpen && (
                        <motion.div
                            className="hidden md:block py-6 border-t-2 border-gray-300 bg-gray-50"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            role="region"
                            aria-label="Accessibility settings"
                        >
                            <div className="space-y-6">
                                <TextSizeAdjuster />
                                <AccessibilityPanel />
                            </div>
                        </motion.div>
                    )}

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                className="md:hidden border-t-2 border-gray-300 py-4 bg-gray-50"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                role="navigation"
                            >
                                <div className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-semibold text-gray-900 hover:text-purple-600 hover:bg-gray-100 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-4 py-3 transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    {auth.user ? (
                                        <>
                                            <div className="border-t-2 border-gray-300 pt-4 mt-4">
                                                <p className="text-lg font-semibold text-gray-900 mb-4">Welcome, {auth.user.name}</p>
                                                {userMenuItems.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center gap-3 text-lg font-semibold text-gray-900 hover:text-purple-600 hover:bg-gray-100 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-4 py-3 transition-colors"
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        <item.icon className="w-5 h-5" aria-hidden="true" />
                                                        {item.name}
                                                    </Link>
                                                ))}
                                                <button
                                                    onClick={() => {
                                                        document.getElementById('logout-form')?.submit();
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-lg font-semibold text-red-600 hover:bg-red-100 rounded-lg transition-colors mt-4 focus:ring-4 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    <LogOut className="w-5 h-5" aria-hidden="true" />
                                                    Logout
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="border-t-2 border-gray-300 pt-4 mt-4 flex flex-col gap-3">
                                                <Link
                                                    href={route('login')}
                                                    className="text-center text-lg font-semibold text-gray-900 hover:text-purple-600 hover:bg-gray-100 focus:ring-4 focus:ring-offset-2 focus:outline-none rounded-lg px-4 py-3 transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href={route('register')}
                                                    className="text-center px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-lg transition-colors focus:ring-4 focus:ring-offset-2 focus:outline-none min-h-[44px] flex items-center justify-center"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    Register
                                                </Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-white font-bold mb-4">Discover Mindanao</h3>
                            <p className="text-sm">A Cultural Journey Through the Philippines' Pearl Island</p>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href={route('home')} className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('explore')} className="hover:text-white transition-colors">
                                        Explore
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-bold mb-4">Contact</h3>
                            <p className="text-sm">Email: info@mindanao.travel</p>
                            <p className="text-sm">Phone: +63 (0) 999 000 0000</p>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm">
                        <p>&copy; 2024 Discover Mindanao. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Hidden Logout Form */}
            <form id="logout-form" action={route('logout')} method="POST" className="hidden">
                <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
            </form>
        </div>
    );
}
