import axios from 'axios';

const API_BASE = '/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const destinationService = {
    /**
     * Search destinations
     */
    search: async (query) => {
        try {
            const response = await api.get('/destinations/search', {
                params: { query },
            });
            return response.data;
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    },

    /**
     * Get all destinations
     */
    getAll: async () => {
        try {
            const response = await axios.get('/explore');
            return response.data;
        } catch (error) {
            console.error('Get destinations error:', error);
            return [];
        }
    },

    /**
     * Get single destination
     */
    getBySlug: async (slug) => {
        try {
            const response = await axios.get(`/destinations/${slug}`);
            return response.data;
        } catch (error) {
            console.error('Get destination error:', error);
            return null;
        }
    },
};

export const travelDiaryService = {
    /**
     * Get all travel diaries for user
     */
    getAll: async () => {
        try {
            const response = await axios.get('/travel-diary');
            return response.data;
        } catch (error) {
            console.error('Get diaries error:', error);
            return [];
        }
    },

    /**
     * Create new travel diary entry
     */
    create: async (data) => {
        try {
            const formData = new FormData();
            formData.append('destination_id', data.destination_id);
            formData.append('notes', data.notes);
            formData.append('rating', data.rating);
            formData.append('visit_date', data.visit_date);

            if (data.photos && data.photos.length > 0) {
                data.photos.forEach((photo, index) => {
                    formData.append(`photos[${index}]`, photo);
                });
            }

            const response = await axios.post('/travel-diary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Create diary error:', error);
            throw error;
        }
    },

    /**
     * Update travel diary entry
     */
    update: async (id, data) => {
        try {
            const formData = new FormData();
            formData.append('destination_id', data.destination_id);
            formData.append('notes', data.notes);
            formData.append('rating', data.rating);
            formData.append('visit_date', data.visit_date);
            formData.append('_method', 'PATCH');

            if (data.photos && data.photos.length > 0) {
                data.photos.forEach((photo, index) => {
                    if (photo instanceof File) {
                        formData.append(`photos[${index}]`, photo);
                    }
                });
            }

            const response = await axios.post(`/travel-diary/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error('Update diary error:', error);
            throw error;
        }
    },

    /**
     * Delete travel diary entry
     */
    delete: async (id) => {
        try {
            const response = await axios.delete(`/travel-diary/${id}`);
            return response.data;
        } catch (error) {
            console.error('Delete diary error:', error);
            throw error;
        }
    },

    /**
     * Get single diary
     */
    getById: async (id) => {
        try {
            const response = await axios.get(`/travel-diary/${id}`);
            return response.data;
        } catch (error) {
            console.error('Get diary error:', error);
            return null;
        }
    },
};

export const weatherService = {
    /**
     * Get weather for location (cached server-side)
     */
    getWeather: async (lat, lon) => {
        try {
            const response = await api.get(`/weather?lat=${lat}&lon=${lon}`);
            return response.data;
        } catch (error) {
            console.error('Weather error:', error);
            return null;
        }
    },
};

export const countriesService = {
    /**
     * Get all countries
     */
    getAll: async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            return response.data;
        } catch (error) {
            console.error('Countries error:', error);
            return [];
        }
    },

    /**
     * Get country by name
     */
    getByName: async (name) => {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
            return response.data;
        } catch (error) {
            console.error('Country error:', error);
            return null;
        }
    },
};

export default api;
