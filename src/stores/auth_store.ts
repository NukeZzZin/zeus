import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  setTokenTuple: (accessToken: string, refreshToken: string) => void;
  clearTokenTuple: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      setTokenTuple: (accessToken, refreshToken) => set({
        accessToken, refreshToken,
        accessTokenExpiresAt: Date.now() + 900_000 // ! (15*60*1000=900000) seconds - 15 minutes
      }),
      clearTokenTuple: () => set({ accessToken: null, refreshToken: null, accessTokenExpiresAt: null }),
    }),
    {
      name: "prometheus:auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresAt: state.accessTokenExpiresAt
      }),
    }
  )
);

export const useIsLoggedIn = () => useAuthStore((state) => !!state.accessToken && !!state.refreshToken);

export default useAuthStore;
