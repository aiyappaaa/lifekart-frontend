import apiClient from './client';
import { AuthResponse, LoginRequest, SignupRequest, User } from '@/types/auth';

export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', data);
    return res.data;
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/signup', data);
    return res.data;
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get<User>('/auth/me');
    return res.data;
  },
};