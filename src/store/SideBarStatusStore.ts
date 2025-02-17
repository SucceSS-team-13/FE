import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      sideBarStatus: true,
      toggleSidebar: () =>
        set((state) => ({
          sideBarStatus: !state.sideBarStatus,
        })),
    }),
    {
      name: "sidebar-storage",
    }
  )
);
