import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers:{'content-type': 'application/json'},
});

//it will attached bearer token to every http request header if user is logged in
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('rag_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Handling token expiration

apiClient.interceptors.response.use((response) => response,
(error) => {
    if(error.response?.status == 401){
        localStorage.removeItem('rag_token');
        localStorage.removeItem('rag_user');
        window.location.reload();
    }

    return Promise.reject(error);
});
