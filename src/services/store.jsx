import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      isLoading: false,

      // UI state
      sidebarCollapsed: false,
      currentPage: "dashboard",

      setLoading: (loading) => set({ isLoading: loading }),

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "form_builder_storage", // unique name
      // Only persist auth state and UI preferences
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
);

export default useStore;
