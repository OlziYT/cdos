import { create } from "zustand";
import { createClub, fetchClubs, deleteClub, updateClub } from "../services/club";
import type { Club, ClubFormData } from "../types/club";

interface ClubStore {
  clubs: Club[];
  isLoading: boolean;
  error: Error | null;
  fetchClubs: () => Promise<void>;
  createClub: (data: ClubFormData) => Promise<void>;
  updateClub: (id: string, data: ClubFormData) => Promise<void>;
  deleteClub: (id: string) => Promise<void>;
}

export const useClubStore = create<ClubStore>((set, get) => ({
  clubs: [],
  isLoading: false,
  error: null,

  fetchClubs: async () => {
    set({ isLoading: true, error: null });
    try {
      const clubs = await fetchClubs();
      set({ clubs, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  createClub: async (data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const newClub = await createClub(data);
      if (newClub) {
        set((state) => ({
          clubs: [...state.clubs, newClub],
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  updateClub: async (id: string, data: ClubFormData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedClub = await updateClub(id, data);
      if (updatedClub) {
        set((state) => ({
          clubs: state.clubs.map((club) =>
            club.id === id ? updatedClub : club
          ),
          isLoading: false,
        }));
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  deleteClub: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteClub(id);
      set((state) => ({
        clubs: state.clubs.filter((club) => club.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
}));
