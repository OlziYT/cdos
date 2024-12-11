import { create } from 'zustand';
import type { Committee, CommitteeFormData } from '../types/committee';
import api from '../lib/api';

interface CommitteeStore {
  committees: Committee[];
  isLoading: boolean;
  error: string | null;
  fetchCommittees: () => Promise<void>;
  createCommittee: (data: CommitteeFormData) => Promise<void>;
  updateCommittee: (id: string, data: CommitteeFormData) => Promise<void>;
  deleteCommittee: (id: string) => Promise<void>;
}

export const useCommitteeStore = create<CommitteeStore>((set, get) => ({
  committees: [],
  isLoading: false,
  error: null,

  fetchCommittees: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/committees');
      set({ committees: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch committees';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  createCommittee: async (data: CommitteeFormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/committees', data);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      const committees = get().committees;
      set({ 
        committees: [...committees, response.data],
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create committee';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  updateCommittee: async (id: string, data: CommitteeFormData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/committees/${id}`, data);
      if (!response.data) {
        throw new Error('No data received from server');
      }
      const committees = get().committees.map((committee) =>
        committee.id === id ? response.data : committee
      );
      set({ committees, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update committee';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  deleteCommittee: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete(`/committees/${id}`);
      const committees = get().committees.filter(
        (committee) => committee.id !== id
      );
      set({ committees, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete committee';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));