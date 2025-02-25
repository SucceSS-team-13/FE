import { create } from "zustand";
import { persist } from "zustand/middleware";

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
        localStorage.removeItem("refreshToken");
      },
    }),
    {
      name: "authData",
    }
  )
);

export default useAuthStore;
