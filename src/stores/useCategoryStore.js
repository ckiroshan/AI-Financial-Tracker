import { create } from "zustand";

export const useCategoryStore = create((set) => ({
  filter: null, // "income" | "expense" | null
  editMode: false,
  setFilter: (filter) => set({ filter }),
  toggleEditMode: () => set((s) => ({ editMode: !s.editMode })),
}));
