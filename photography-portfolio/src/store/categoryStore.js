import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories:[],
    createCategory: (category) => set((state) => ({categories: [category, ...state.categories]})),
    deleteCategory: (id) => set((state) => ({ categories: state.categories.filter((category) => category.id !== id) })),
    setCategory: (categories) => set({ categories }),
}))

export default useCategoryStore