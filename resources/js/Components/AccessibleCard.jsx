import React from 'react';
import { motion } from 'framer-motion';

/**
 * Accessible Card Component
 * - Large text
 * - Clear visual hierarchy
 * - Proper semantic structure
 * - High contrast backgrounds
 * - Focus-visible states for keyboard navigation
 */
export default function AccessibleCard({
    children,
    className = '',
    title,
    description,
    onClick,
    href,
    imageUrl,
    badge,
    variant = 'default',
    ariaLabel,
    role = 'article',
    ...props
}) {
    const Wrapper = href ? 'a' : onClick ? 'button' : 'div';
    
    const baseStyles = 'overflow-hidden rounded-xl transition-all duration-300 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:outline-none';
    
    const variantStyles = {
        default: 'bg-white border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-emerald-300',
        primary: 'bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-300 shadow-md hover:shadow-lg',
        elevated: 'bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl',
    };

    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        hover: { y: -8, transition: { duration: 0.2 } },
    };

    const content = (
        <>
            {imageUrl && (
                <div className="relative w-full h-48 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title || ''}
                        className="w-full h-full object-cover"
                    />
                    {badge && (
                        <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                            {badge}
                        </div>
                    )}
                </div>
            )}
            <div className="p-6">
                {title && (
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                        {title}
                    </h3>
                )}
                {description && (
                    <p className="text-base text-gray-700 mb-4 leading-relaxed">
                        {description}
                    </p>
                )}
                {children && <div className="text-base text-gray-700">{children}</div>}
            </div>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={`${baseStyles} ${variantStyles[variant]} ${className} block`}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                aria-label={ariaLabel}
                {...props}
            >
                {content}
            </motion.a>
        );
    }

    if (onClick) {
        return (
            <motion.button
                onClick={onClick}
                className={`${baseStyles} ${variantStyles[variant]} ${className} w-full text-left`}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                aria-label={ariaLabel}
                {...props}
            >
                {content}
            </motion.button>
        );
    }

    return (
        <motion.div
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            role={role}
            aria-label={ariaLabel}
            {...props}
        >
            {content}
        </motion.div>
    );
}
