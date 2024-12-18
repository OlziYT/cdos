import { create } from "zustand";
import { createClub, fetchClubs, deleteClub, updateClub } from "../services/club";
import type { Club, ClubFormData } from "../types/club";

interface ClubStore {
  clubs: Club[];
  isLoading: boolean;
  error: Error | null;
  fetchClubs: () => Promise<void>;
  createClub: (data: ClubFormData, image?: File) => Promise<Club | null>;
  updateClub: (id: string, data: ClubFormData, image?: File | null) => Promise<void>;
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

  createClub: async (data: ClubFormData, image?: File) => {
    set({ isLoading: true, error: null });
    try {
      const newClub = await createClub(data, image);
      if (newClub) {
        set((state) => ({
          clubs: [...state.clubs, newClub],
          isLoading: false,
        }));
        return newClub;
      }
      return null;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      return null;
    }
  },

  updateClub: async (id: string, data: ClubFormData, image?: File | null) => {
    set({ isLoading: true, error: null });
    try {
      const updatedClub = await updateClub(id, data, image);
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
