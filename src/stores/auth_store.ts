import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

{/* TODO: Implementar renovação automática da sessão */}

interface AuthState {
  isLoggedIn: boolean
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null

  setTokenTuple: (accessToken: string, refreshToken: string, expiresIn: number) => void
  clearTokenTuple: () => void
}

const useAuthStore = create<AuthState>()(
  persist((set) => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    expiresIn: null,

    setTokenTuple: (accessToken, refreshToken, expiresIn) => set({ isLoggedIn: true, accessToken, refreshToken, expiresIn }),
    clearTokenTuple: () => set({ isLoggedIn: false, accessToken: null, refreshToken: null, expiresIn: null })
  }), {
    name: "prometheus:auth",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({ isLoggedIn: state.isLoggedIn, accessToken: state.accessToken, refreshToken: state.refreshToken, expiresIn: state.expiresIn })
  })
)

export default useAuthStore;
