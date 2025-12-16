import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const getDefaultBaseURL = () => {
    const port = 3000;
    if (Platform.OS === 'android') return `http://10.0.2.2:${port}/api`;
    return `http://192.168.1.44:${port}/api`;
};

// const baseURL = process.env.EXPO_PUBLIC_API_URL ?? getDefaultBaseURL();
const baseURL = `http://192.168.1.44:3000/api`

const api = axios.create({ baseURL });

// Refresh token on 403 responses
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = await SecureStore.getItemAsync('refreshToken');
            if (!refreshToken) return Promise.reject(error);

            const refreshURL = `${baseURL.replace(/\/+$/, '')}/auth/refresh`;
            const response = await axios.post(refreshURL, { refreshToken });
            const newAccessToken = response.data.accessToken;

            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${newAccessToken}`,
            };
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default api;