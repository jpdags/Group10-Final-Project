import { useState, useCallback } from 'react';

/**
 * useAsync - Custom hook for async operations
 * @param {Function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Execute immediately on mount
 */
export const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const execute = useCallback(async (...args) => {
        setStatus('pending');
        setData(null);
        setError(null);

        try {
            const response = await asyncFunction(...args);
            setData(response);
            setStatus('success');
            return response;
        } catch (err) {
            setError(err);
            setStatus('error');
            throw err;
        }
    }, [asyncFunction]);

    if (immediate) {
        execute();
    }

    return { execute, status, data, error };
};

/**
 * useLocalStorage - Custom hook for local storage
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading from localStorage: ${error}`);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`Error writing to localStorage: ${error}`);
            }
        },
        [key, storedValue]
    );

    return [storedValue, setValue];
};

/**
 * useDebounce - Custom hook for debouncing values
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in ms
 */
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * usePrevious - Custom hook to get previous value
 * @param {any} value - Current value
 */
export const usePrevious = (value) => {
    const ref = React.useRef();

    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * useMount - Custom hook to run effect on mount only
 * @param {Function} callback - Function to execute
 */
export const useMount = (callback) => {
    React.useEffect(() => {
        callback();
    }, []);
};

/**
 * useUnmount - Custom hook to run effect on unmount only
 * @param {Function} callback - Function to execute
 */
export const useUnmount = (callback) => {
    React.useEffect(() => {
        return () => callback();
    }, []);
};

/**
 * useWindowSize - Custom hook to track window size
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

/**
 * useOnClickOutside - Custom hook to detect clicks outside element
 * @param {React.Ref} ref - Reference to element
 * @param {Function} callback - Function to execute
 */
export const useOnClickOutside = (ref, callback) => {
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [ref, callback]);
};
