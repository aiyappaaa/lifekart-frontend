// src/store/authStore.ts
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  setUser: (user: any) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  // Safely check localStorage on client side
  token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    }
    set({ token });
  },

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    return !!get().token;
  },
}));

export default useAuthStore;