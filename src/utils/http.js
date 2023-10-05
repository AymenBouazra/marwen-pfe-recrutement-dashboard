import axios from "axios";
import { getCookie } from './functions'
const BASE_URL = process.env.REACT_APP_BASE_URL
const axiosApiInstance = axios.create({
    baseURL: BASE_URL + '/api/',
    headers: {
        "Content-type": "application/json"
    }
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    async config => {
        const token = getCookie("token");

        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default axiosApiInstance;