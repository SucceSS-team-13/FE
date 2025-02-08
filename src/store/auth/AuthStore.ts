import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("accessToken");
      },
    }),
    {
      name: "authData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
