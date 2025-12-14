import React from 'react';
import { motion } from 'framer-motion';

/**
 * Accessible Button Component
 * - Large click targets (minimum 44x44px for mobile)
 * - High contrast colors
 * - Clear focus states for keyboard navigation
 * - Screen reader friendly
 * - Proper ARIA labels
 */
export default function AccessibleButton({
    children,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    ariaLabel,
    ariaDescribedBy,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    fullWidth = false,
    ...props
}) {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px]',
        lg: 'px-8 py-4 text-lg min-h-[48px] min-w-[48px]',
        xl: 'px-10 py-5 text-xl min-h-[56px] min-w-[56px]',
    };

    const variantStyles = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 active:bg-emerald-800',
        secondary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 active:bg-blue-800',
        outline: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 active:bg-red-800',
        ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className} flex items-center justify-center gap-2`}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            {...props}
        >
            {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
            <span>{children}</span>
        </motion.button>
    );
}
