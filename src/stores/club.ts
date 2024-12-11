import { create } from 'zustand';
import type { Club, ClubFormData } from '../types/club';
import { clubApi } from '../lib/api/club';

interface ClubState {
  clubs: Club[];
  isLoading: boolean;
  error: string | null;
}

interface ClubActions {
  fetchClubs: () => Promise<void>;
  fetchClubsByCommittee: (committeeId: string) => Promise<void>;
  createClub: (data: ClubFormData) => Promise<void>;
  updateClub: (id: string, data: ClubFormData) => Promise<void>;
  deleteClub: (id: string) => Promise<void>;
  importClubs: (file: File) => Promise<void>;
}

interface ClubStore extends ClubState, ClubActions {}

export const useClubStore = create<ClubStore>((set, get) => ({
  clubs: [],
  isLoading: false,
  error: null,

  fetchClubs: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await clubApi.getAll();
      if (result.error) {
        throw new Error(result.error.message);
      }
      set({ clubs: result.data, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch clubs';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  fetchClubsByCommittee: async (committeeId: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await clubApi.getAll();
      if (result.error) {
        throw new Error(result.error.message);
      }
      const filteredClubs = result.data.filter(club => club.committeeId === committeeId);
      set({ clubs: filteredClubs, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch clubs';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  createClub: async (data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await clubApi.create(data);
      if (result.error) {
        throw new Error(result.error.message);
      }
      const clubs = get().clubs;
      set({ clubs: [...clubs, result.data], isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create club';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  updateClub: async (id: string, data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await clubApi.update(id, data);
      if (result.error) {
        throw new Error(result.error.message);
      }
      const clubs = get().clubs.map((club) =>
        club.id === id ? result.data : club
      );
      set({ clubs, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update club';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  deleteClub: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await clubApi.delete(id);
      if (result.error) {
        throw new Error(result.error.message);
      }
      const clubs = get().clubs.filter((club) => club.id !== id);
      set({ clubs, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete club';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  importClubs: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('file', file);
      // TODO: Implement proper file import API
      set({ isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to import clubs';
      set({ error: message, isLoading: false });
      throw error;
    }
  },
}));