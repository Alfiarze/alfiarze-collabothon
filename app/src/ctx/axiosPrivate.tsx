import axios from 'axios';
import { API_URL } from './conf';

const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
});

export default axiosPrivate;
