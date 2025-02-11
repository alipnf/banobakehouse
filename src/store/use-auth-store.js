import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })),
);

export default useAuthStore;
