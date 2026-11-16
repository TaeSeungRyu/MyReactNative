import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
});

// 요청 인터셉터
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('access_token');

        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        console.log('API 요청:', config.url);

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('access_token');
        if (!token) {
            return Promise.reject(
                new Error('로그인이 필요합니다.')
            );
        }
        config.headers.set('Authorization', `Bearer ${token}`);
        return config;
    },
    (error) => Promise.reject(error)
);
export default api;