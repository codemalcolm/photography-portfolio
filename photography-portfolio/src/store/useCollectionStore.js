import { create } from "zustand";

export const useCollectionStore = create((set) => ({
  collections: [],
  loading: false,
  error: null,
  setCollections: (data) => set({ collections: data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
