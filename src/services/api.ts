import axios from 'axios';

import { getToken, removeToken } from '../utils/token';

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      removeToken();

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
