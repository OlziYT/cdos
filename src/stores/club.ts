import { create } from "zustand";
import { createClub, fetchClubs } from "../services/club";
import type { Club, ClubFormData } from "../types/club";

interface ClubStore {
  clubs: Club[];
  isLoading: boolean;
  error: Error | null;
  fetchClubs: () => Promise<void>;
  createClub: (data: ClubFormData) => Promise<void>;
}

export const useClubStore = create<ClubStore>((set) => ({
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
        const clubs = await fetchClubs();
        set({ clubs, isLoading: false });
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
}));
