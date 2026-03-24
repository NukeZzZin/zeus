import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null

  setTokenTuple: (accessToken: string, refreshToken: string, expiresIn: number) => void
  clearTokenTuple: () => void
}

const useAuthStore = create<AuthState>()(
  persist((set) => ({
    accessToken: null,
    refreshToken: null,
    expiresIn: null,

    setTokenTuple: (accessToken, refreshToken, expiresIn) => set({ accessToken, refreshToken, expiresIn }),
    clearTokenTuple: () => set({ accessToken: null, refreshToken: null, expiresIn: null })
  }), {
    name: "prometheus:auth",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken, expiresIn: state.expiresIn })
  })
)


export default useAuthStore;
