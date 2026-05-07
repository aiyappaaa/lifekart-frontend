// src/utils/api.ts
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request automatically
api.interceptors.request.use((config) => {
  // We check if window is defined to ensure this only runs on the client side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;