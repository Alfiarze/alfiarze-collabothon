import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:8000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
});

console.log('API URL:', import.meta.env.API_URL);

export default axiosPrivate;
