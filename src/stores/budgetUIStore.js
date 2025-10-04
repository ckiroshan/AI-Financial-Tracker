import { create } from "zustand";

export const useBudgetUIStore = create((set) => ({
  filterStatus: "all",
  searchQuery: "",
  isAddModalOpen: false,
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setIsAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen }),
}));
