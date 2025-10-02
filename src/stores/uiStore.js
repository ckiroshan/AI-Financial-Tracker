import { create } from "zustand";

export const useUIStore = create((set) => ({
  selectedMonth: new Date(),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
