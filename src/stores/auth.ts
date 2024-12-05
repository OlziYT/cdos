import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, User } from '../types/auth';
import api from '../lib/api';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const getAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', credentials);
          set({
            user: response.data.user,
            token: response.data.token,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: 'Invalid credentials',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      updateUser: (user) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);