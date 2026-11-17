import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

type RetryConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

const api = axios.create({
    baseURL: 'https://example.com',
    timeout: 10000,
});

// 학습용 가짜 서버
const mock = new MockAdapter(api, { delayResponse: 300 });

mock.onGet('/users').reply(async (config) => {
    const token = config.headers?.['Authorization'];
    if (token !== 'Bearer new-access-token') {
        return [401, { message: '토큰 만료' }];
    }

    return [200, [{ id: 1, name: '홍길동' }]];
});

// 요청 인터셉터
api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
});

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            console.log('401 발생 → 토큰 재발급 시도');

            const refreshToken =
                await SecureStore.getItemAsync(REFRESH_KEY);

            if (!refreshToken) {
                console.log('Refresh Token 없음 → 로그인 필요');
                return Promise.reject(error);
            }

            // 학습용 가짜 재발급
            const newToken = 'new-access-token';

            await SecureStore.setItemAsync(TOKEN_KEY, newToken);

            originalRequest.headers.set(
                'Authorization',
                `Bearer ${newToken}`
            );

            console.log('토큰 재발급 성공 → 기존 요청 재시도');

            return api(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;