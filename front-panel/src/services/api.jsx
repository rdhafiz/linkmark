import { getCookie } from './cookies.jsx';

const BASE_URL = 'http://localhost:4000';

// Helper function to handle HTTP errors
const handleErrors = (response) => {
    return response;
};

const Token = () => {
    return getCookie('authToken'); // Call it as a function to get the token value
};

const api = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token()}`, // Call Token as a function
                },
            });
            handleErrors(response);
            return response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    },

    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token()}`, // Call Token as a function
                },
                body: JSON.stringify(data),
            });
            handleErrors(response);
            return response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    },

    put: async (endpoint, data) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Token()}`, // Call Token as a function
                },
                body: JSON.stringify(data),
            });
            handleErrors(response);
            return response.json();
        } catch (error) {
            console.error('PUT request failed:', error);
            throw error;
        }
    },

    delete: async (endpoint) => {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${Token()}`, // Call Token as a function
                },
            });
            handleErrors(response);
            return response.json();
        } catch (error) {
            console.error('DELETE request failed:', error);
            throw error;
        }
    },
};

export default api;
