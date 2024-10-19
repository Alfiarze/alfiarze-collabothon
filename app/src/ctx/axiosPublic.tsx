import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: import.meta.env.API_URL || 'http://localhost:8000/',
});

export default axiosPublic;
