import { getCategories } from "@/services/supabase/categories-service";
import {
  getProductByCategory,
  getProducts,
  getProductByName,
} from "@/services/supabase/products-services";
import { useState, useEffect } from "react";
import useProductStore from "@/store/use-product-store";

const useProducts = () => {
  const { products, setProducts, categories, setCategories } =
    useProductStore();
  // const [sortBy, setSortBy] = useState("price-low");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 9;

  // Fetch semua kategori
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [setCategories]);

  // Efek untuk mengambil data produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let result;
        if (searchQuery) {
          result = await getProductByName(searchQuery, currentPage, pageSize);
        } else if (selectedCategory) {
          result = await getProductByCategory(
            selectedCategory,
            currentPage,
            pageSize,
          );
        } else {
          result = await getProducts(currentPage, pageSize);
        }

        setProducts(result.products);
        setTotalProducts(result.total);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, pageSize, searchQuery, selectedCategory, setProducts]);

  // Reset ke halaman pertama saat ada perubahan filter/pencarian
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchSearchedProducts = async () => {
      try {
        const { products: searchedProducts } =
          await getProductByName(searchQuery);
        setProducts(searchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchQuery) {
      fetchSearchedProducts();
    }
  }, [searchQuery, setProducts]);

  return {
    products,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalProducts,
    pageSize,
  };
};

export default useProducts;
