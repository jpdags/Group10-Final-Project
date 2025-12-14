import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Accessible Select/Dropdown Component
 * - Keyboard accessible (arrow keys, Enter, Escape)
 * - Screen reader friendly
 * - Large text and buttons
 * - High contrast
 * - Focus management
 */
export default function AccessibleSelect({
    label,
    name,
    id,
    options = [],
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    className = '',
    size = 'md',
    ariaLabel,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const errorId = error ? `${id}-error` : undefined;

    const selectedOption = options.find(opt => opt.value === value);
    const selectedLabel = selectedOption?.label || 'Select...';

    const sizeStyles = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base min-h-[44px]',
        lg: 'px-5 py-4 text-lg min-h-[48px]',
    };

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev < options.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0) {
                    onChange(options[focusedIndex].value);
                    setIsOpen(false);
                    setFocusedIndex(-1);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-base font-semibold text-gray-900 mb-2"
                >
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <motion.button
                    type="button"
                    id={id}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-options`}
                    aria-describedby={errorId}
                    aria-invalid={!!error}
                    aria-label={ariaLabel || label}
                    className={`
                        w-full ${sizeStyles[size]}
                        border-2 rounded-lg
                        text-left
                        text-gray-900
                        transition-all duration-200
                        focus:outline-none
                        ${isOpen ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-gray-300 hover:border-gray-400'}
                        ${error ? 'border-red-500 ring-4 ring-red-200' : ''}
                        ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
                        flex items-center justify-between
                    `}
                >
                    <span className="flex-1">{selectedLabel}</span>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                    />
                </motion.button>

                {isOpen && (
                    <motion.div
                        id={`${id}-options`}
                        role="listbox"
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {options.map((option, index) => (
                            <motion.button
                                key={option.value}
                                type="button"
                                role="option"
                                aria-selected={value === option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                    setFocusedIndex(-1);
                                }}
                                onKeyDown={handleKeyDown}
                                className={`
                                    w-full px-4 py-3 text-base text-left font-medium
                                    transition-all duration-200
                                    border-b-2 border-gray-100 last:border-b-0
                                    ${focusedIndex === index ? 'bg-emerald-100 border-l-4 border-l-emerald-600' : ''}
                                    ${value === option.value ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-gray-700 hover:bg-gray-50'}
                                `}
                                whileHover={{ paddingLeft: '1.5rem' }}
                            >
                                {option.label}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </div>

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
        </div>
    );
}
