// Application Constants

export const APP_NAME = 'Discover Mindanao';
export const APP_TAGLINE = 'A Cultural Journey Through the Philippines\' Pearl Island';

// API Endpoints
export const API_ENDPOINTS = {
    DESTINATIONS: '/api/destinations',
    WEATHER: '/api/weather',
    TRAVEL_DIARY: '/travel-diary',
};

// Cache Duration (in seconds)
export const CACHE_DURATION = {
    SHORT: 300, // 5 minutes
    MEDIUM: 1800, // 30 minutes
    LONG: 3600, // 1 hour
    VERY_LONG: 86400, // 24 hours
};

// Rating Options
export const RATINGS = [
    { value: 1, label: '1 Star - Poor', color: 'text-red-500' },
    { value: 2, label: '2 Stars - Fair', color: 'text-orange-500' },
    { value: 3, label: '3 Stars - Good', color: 'text-yellow-500' },
    { value: 4, label: '4 Stars - Very Good', color: 'text-green-500' },
    { value: 5, label: '5 Stars - Excellent', color: 'text-green-600' },
];

// Regions
export const REGIONS = [
    'Davao',
    'Misamis Oriental',
    'Zamboanga Peninsula',
    'Lanao del Sur',
    'South Cotabato',
    'Maguindanao del Norte',
    'Agusan del Norte',
    'Lanao del Norte',
];

// Months
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// File Upload Config
export const FILE_UPLOAD = {
    MAX_FILE_SIZE: 5242880, // 5MB in bytes
    MAX_FILES: 10,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    PER_PAGE: 12,
    MAX_PER_PAGE: 100,
};

// Animation Duration (in seconds)
export const ANIMATION_DURATION = {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    VERY_SLOW: 0.8,
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    AUTH_ERROR: 'Authentication failed. Please log in again.',
    NOT_FOUND: 'The requested resource was not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UPLOAD_ERROR: 'File upload failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    CREATED: 'Successfully created!',
    UPDATED: 'Successfully updated!',
    DELETED: 'Successfully deleted!',
    SAVED: 'Changes saved!',
};

// User Roles
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
};

// Routes
export const ROUTES = {
    HOME: '/',
    EXPLORE: '/explore',
    TRAVEL_DIARY: '/travel-diary',
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTER: '/register',
};

// Colors
export const COLORS = {
    PRIMARY: '#a855f7', // purple-600
    SECONDARY: '#3b82f6', // blue-500
    SUCCESS: '#22c55e', // green-500
    WARNING: '#f59e0b', // amber-500
    DANGER: '#ef4444', // red-500
    LIGHT: '#f3f4f6', // gray-100
    DARK: '#1f2937', // gray-800
};

// Status
export const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER: 'user',
    AUTH_TOKEN: 'auth_token',
    THEME: 'theme',
    PREFERENCES: 'preferences',
    RECENT_DESTINATIONS: 'recent_destinations',
};

// Validation Rules
export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 8,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 255,
    MIN_NOTES_LENGTH: 10,
    MAX_NOTES_LENGTH: 5000,
};

// Weather Icons (OpenWeather)
export const WEATHER_ICONS = {
    'clear sky': '☀️',
    'few clouds': '🌤️',
    'scattered clouds': '⛅',
    'broken clouds': '☁️',
    'shower rain': '🌦️',
    'rain': '🌧️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'mist': '🌫️',
};

// Destinations (Preloaded)
export const MINDANAO_DESTINATIONS = [
    {
        id: 1,
        name: 'Davao City',
        slug: 'davao-city',
        region: 'Davao',
        description: 'The Gateway to Mindanao',
    },
    {
        id: 2,
        name: 'Cagayan de Oro',
        slug: 'cagayan-de-oro',
        region: 'Misamis Oriental',
        description: 'Adventure capital of the Philippines',
    },
    {
        id: 3,
        name: 'Zamboanga City',
        slug: 'zamboanga-city',
        region: 'Zamboanga Peninsula',
        description: 'Pearl of Mindanao',
    },
    {
        id: 4,
        name: 'Marawi City',
        slug: 'marawi-city',
        region: 'Lanao del Sur',
        description: 'The Islamic City of the Philippines',
    },
    {
        id: 5,
        name: 'General Santos City',
        slug: 'general-santos-city',
        region: 'South Cotabato',
        description: 'Tuna capital of the Philippines',
    },
    {
        id: 6,
        name: 'Cotabato City',
        slug: 'cotabato-city',
        region: 'Maguindanao del Norte',
        description: 'Historic city where rivers meet',
    },
    {
        id: 7,
        name: 'Butuan City',
        slug: 'butuan-city',
        region: 'Agusan del Norte',
        description: 'Gateway to the Caraga Region',
    },
    {
        id: 8,
        name: 'Iligan City',
        slug: 'iligan-city',
        region: 'Lanao del Norte',
        description: 'City of Majestic Waterfalls',
    },
];
