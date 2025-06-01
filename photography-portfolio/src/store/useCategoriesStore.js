import { create } from "zustand";

const useCategoriesStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  success: false,
  setLoading: (loading) => set({ loading }),
  setSuccess: (success) => set({ success }),
  setError: (error) => set({ error }),
  setCategories: (data) => set({ categories: data }),
  createCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));

export default useCategoriesStore;
