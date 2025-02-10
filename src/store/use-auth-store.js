import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase/firebase-config";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })),
);

onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

export default useAuthStore;
