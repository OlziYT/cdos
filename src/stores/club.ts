import { create } from 'zustand';
import type { Club, ClubFormData } from '../types/club';
import api from '../lib/api';

interface ClubStore {
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
  fetchClubs: () => Promise<void>;
  fetchClubsByCommittee: (committeeId: string) => Promise<void>;
  createClub: (data: ClubFormData) => Promise<void>;
  updateClub: (id: string, data: ClubFormData) => Promise<void>;
  deleteClub: (id: string) => Promise<void>;
  importClubs: (file: File) => Promise<void>;
}

export const useClubStore = create<ClubStore>((set, get) => ({
  clubs: [],
  isLoading: false,
  error: null,

  fetchClubs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/clubs');
      set({ clubs: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch clubs', isLoading: false });
    }
  },

  fetchClubsByCommittee: async (committeeId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/committees/${committeeId}/clubs`);
      set({ clubs: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch clubs', isLoading: false });
    }
  },

  createClub: async (data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/clubs', data);
      const clubs = get().clubs;
      set({ clubs: [...clubs, response.data], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to create club', isLoading: false });
      throw error;
    }
  },

  updateClub: async (id: string, data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/clubs/${id}`, data);
      const clubs = get().clubs.map((club) =>
        club.id === id ? response.data : club
      );
      set({ clubs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update club', isLoading: false });
      throw error;
    }
  },

  deleteClub: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/clubs/${id}`);
      const clubs = get().clubs.filter((club) => club.id !== id);
      set({ clubs, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to delete club', isLoading: false });
      throw error;
    }
  },

  importClubs: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/clubs/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ clubs: response.data, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to import clubs', isLoading: false });
      throw error;
    }
  },
}));