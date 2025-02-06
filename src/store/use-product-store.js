import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist((set) => ({
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),
  })),
);

export default useProductStore;
