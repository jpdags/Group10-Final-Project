import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Accessible Form Input Component
 * - Large touch targets
 * - Clear labels with high contrast
 * - Error messages with ARIA live regions
 * - Focus management
 * - Proper semantic HTML
 */
export default function AccessibleInput({
    label,
    type = 'text',
    name,
    id,
    value,
    onChange,
    placeholder,
    error,
    helpText,
    required = false,
    disabled = false,
    className = '',
    size = 'md',
    autoComplete,
    ariaLabel,
    ariaDescribedBy,
    ...props
}) {
    const [isFocused, setIsFocused] = useState(false);
    const errorId = error ? `${id}-error` : undefined;
    const helpTextId = helpText ? `${id}-help` : undefined;
    const describedBy = [ariaDescribedBy, errorId, helpTextId].filter(Boolean).join(' ');

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base min-h-[44px]',
        lg: 'px-5 py-4 text-lg min-h-[48px]',
    };

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-base font-semibold text-gray-900 mb-2"
                >
                    {label}
                    {required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
                </label>
            )}
            <motion.input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                aria-label={ariaLabel || label}
                aria-describedby={describedBy || undefined}
                aria-invalid={!!error}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`
                    w-full ${sizeStyles[size]} 
                    border-2 rounded-lg
                    text-gray-900 placeholder-gray-500
                    transition-all duration-200
                    focus:outline-none
                    ${isFocused ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-gray-300'}
                    ${error ? 'border-red-500 ring-4 ring-red-200' : ''}
                    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
                    ${className}
                `}
                whileFocus={{ scale: 1.01 }}
                {...props}
            />
            {error && (
                <motion.p
                    id={errorId}
                    className="text-red-600 font-semibold text-base mt-2"
                    role="alert"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.p>
            )}
            {helpText && !error && (
                <p id={helpTextId} className="text-gray-600 text-sm mt-1">
                    {helpText}
                </p>
            )}
        </div>
    );
}
