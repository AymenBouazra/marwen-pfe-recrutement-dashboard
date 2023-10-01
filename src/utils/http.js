import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL
const axiosApiInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
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