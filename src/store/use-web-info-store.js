import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWebInfoStore = create(
  persist(
    (set) => ({
      webInfo: null,
      setWebInfo: (webInfo) => set({ webInfo }),
    }),
    {
      name: "web-info-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useWebInfoStore;
