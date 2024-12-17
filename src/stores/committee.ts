import { create } from "zustand";
import { createCommittee, fetchCommittees, deleteCommittee } from "../services/committee";
import type { Committee, CommitteeFormData } from "../types/committee";

interface CommitteeStore {
  committees: Committee[];
  isLoading: boolean;
  error: Error | null;
  fetchCommittees: () => Promise<void>;
  createCommittee: (data: CommitteeFormData) => Promise<void>;
  deleteCommittee: (id: string) => Promise<void>;
}

export const useCommitteeStore = create<CommitteeStore>((set) => ({
  committees: [],
  isLoading: false,
  error: null,

  fetchCommittees: async () => {
    set({ isLoading: true, error: null });
    try {
      const committees = await fetchCommittees();
      set({ committees, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  createCommittee: async (data: CommitteeFormData) => {
    set({ isLoading: true, error: null });
    try {
      const newCommittee = await createCommittee(data);
      if (newCommittee) {
        const committees = await fetchCommittees();
        set({ committees, isLoading: false });
      }
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },

  deleteCommittee: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteCommittee(id);
      const committees = await fetchCommittees();
      set({ committees, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
}));