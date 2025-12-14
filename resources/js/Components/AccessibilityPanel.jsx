import React from 'react';
import { Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';

/**
 * Accessibility Settings Panel
 * - Dark mode toggle
 * - High contrast toggle
 * - Screen reader announcements
 * - Reduced animations toggle
 */
export default function AccessibilityPanel() {
    const [darkMode, setDarkMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('darkMode') === 'true';
        }
        return false;
    });

    const [highContrast, setHighContrast] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('highContrast') === 'true';
        }
        return false;
    });

    const [reducedMotion, setReducedMotion] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('reducedMotion') === 'true';
        }
        return false;
    });

    const [screenReaderMode, setScreenReaderMode] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('screenReaderMode') === 'true';
        }
        return false;
    });

    React.useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    React.useEffect(() => {
        localStorage.setItem('highContrast', highContrast);
        if (highContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [highContrast]);

    React.useEffect(() => {
        localStorage.setItem('reducedMotion', reducedMotion);
        if (reducedMotion) {
            document.documentElement.style.setProperty('--motion-duration', '0.01ms');
        } else {
            document.documentElement.style.removeProperty('--motion-duration');
        }
    }, [reducedMotion]);

    React.useEffect(() => {
        localStorage.setItem('screenReaderMode', screenReaderMode);
    }, [screenReaderMode]);

    const toggleSetting = (setting, value, setter) => {
        setter(!value);
        if (screenReaderMode) {
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = `${setting} ${!value ? 'enabled' : 'disabled'}`;
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 1000);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                <label className="text-base font-semibold text-gray-900">
                    <Eye className="w-5 h-5 inline mr-2" aria-hidden="true" />
                    Dark Mode
                </label>
                <button
                    onClick={() => toggleSetting('Dark mode', darkMode, setDarkMode)}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${
                        darkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-400 hover:bg-gray-500'
                    } focus:ring-4 focus:ring-offset-2 focus:outline-none`}
                    aria-label={`Toggle dark mode (currently ${darkMode ? 'on' : 'off'})`}
                    aria-pressed={darkMode}
                >
                    {darkMode ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                <label className="text-base font-semibold text-gray-900">
                    <EyeOff className="w-5 h-5 inline mr-2" aria-hidden="true" />
                    High Contrast
                </label>
                <button
                    onClick={() => toggleSetting('High contrast', highContrast, setHighContrast)}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${
                        highContrast ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-400 hover:bg-gray-500'
                    } focus:ring-4 focus:ring-offset-2 focus:outline-none`}
                    aria-label={`Toggle high contrast (currently ${highContrast ? 'on' : 'off'})`}
                    aria-pressed={highContrast}
                >
                    {highContrast ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                <label className="text-base font-semibold text-gray-900">
                    Reduce Animations
                </label>
                <button
                    onClick={() => toggleSetting('Reduced motion', reducedMotion, setReducedMotion)}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${
                        reducedMotion ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-400 hover:bg-gray-500'
                    } focus:ring-4 focus:ring-offset-2 focus:outline-none`}
                    aria-label={`Toggle reduced animations (currently ${reducedMotion ? 'on' : 'off'})`}
                    aria-pressed={reducedMotion}
                >
                    {reducedMotion ? 'ON' : 'OFF'}
                </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                <label className="text-base font-semibold text-gray-900">
                    <Volume2 className="w-5 h-5 inline mr-2" aria-hidden="true" />
                    Screen Reader Mode
                </label>
                <button
                    onClick={() => toggleSetting('Screen reader announcements', screenReaderMode, setScreenReaderMode)}
                    className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${
                        screenReaderMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-400 hover:bg-gray-500'
                    } focus:ring-4 focus:ring-offset-2 focus:outline-none`}
                    aria-label={`Toggle screen reader mode (currently ${screenReaderMode ? 'on' : 'off'})`}
                    aria-pressed={screenReaderMode}
                >
                    {screenReaderMode ? 'ON' : 'OFF'}
                </button>
            </div>
        </div>
    );
}
