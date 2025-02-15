import { create } from "zustand";
import { persist } from "zustand/middleware";
import { serviceLogout } from "@/services/firebase/auth-service";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      signOut: async () => {
        try {
          // Panggil fungsi logout dari Firebase
          await serviceLogout();

          // Hapus data dari local storage secara manual
          if (typeof window !== "undefined") {
            localStorage.removeItem("auth-storage");
          }

          // Reset state user menjadi null
          set({ user: null });
        } catch (error) {
          console.error("Error during sign out:", error);
        }
      },
    }),
    {
      name: "auth-storage", // Nama key untuk local storage
      getStorage: () => localStorage, // Menyimpan state di local storage
    },
  ),
);

export default useAuthStore;
