import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      selectedProduct: null,
      categories: [],
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      setProducts: (products) => set({ products }),
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "product-storage",
      getStorage: () => localStorage,
    },
  ),
);

export default useProductStore;
