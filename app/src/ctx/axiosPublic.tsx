import axios from 'axios';
import { API_URL } from './conf';

const axiosPublic = axios.create({
    baseURL: API_URL,
});

export default axiosPublic;
