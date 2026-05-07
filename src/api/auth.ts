// src/api/auth.ts
import api from '../utils/api';

// SIGNUP - Create new account
export const signup = async (userData: any) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// LOGIN - Get JWT token
export const login = async (credentials: any) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

// GET CURRENT USER - Fetch logged-in user info
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};