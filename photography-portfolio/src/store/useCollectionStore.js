import { create } from "zustand";

export const useCollectionStore = create((set) => ({
  collections: [],
  loading: false,
  error: null,
  success: false,
  setLoading: (loading) => set({ loading }),
  setSuccess: (success) => set({ success }),
  setError: (error) => set({ error }),
  setCollections: (data) => set({ collections: data }),
  removeCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter((col) => col.id !== id),
    })),
  addCollection: (collection) =>
    set((state) => ({
      collections: [...state.collections, collection],
    })),
}));
