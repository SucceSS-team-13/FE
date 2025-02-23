import { create } from "zustand";

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set) => ({
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
  toggleTheme: () =>
    set((state: { isDarkMode: boolean }) => {
      const newMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", newMode.toString());

      return { isDarkMode: newMode };
    }),
}));

export default useThemeStore;
