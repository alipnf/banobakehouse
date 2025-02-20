import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setProducts: (products) => set({ products }),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useProductStore;
