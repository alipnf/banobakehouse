import { getCategories } from "@/services/supabase/categories-service";
import {
  getProductByCategory,
  getProducts,
  getProductByName,
} from "@/services/supabase/products-services";
import { CategorySidebar, Pagination, ProductCard, SearchAndSort } from "./";
import { useState, useEffect } from "react";
import useProductStore from "@/store/use-product-store";

const Products = () => {
  const { products, setProducts } = useProductStore();
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("price-low");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  }, []);

  // Fetch produk berdasarkan kategori atau semua produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let fetchedProducts = [];
        if (selectedCategory) {
          // Jika ada kategori terpilih, ambil produk berdasarkan kategori
          const { products: categoryProducts } =
            await getProductByCategory(selectedCategory);
          fetchedProducts = categoryProducts;
        } else {
          // Jika tidak ada kategori terpilih, ambil semua produk
          const { products: allProducts } = await getProducts();
          fetchedProducts = allProducts;
        }
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [selectedCategory, setProducts]);

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

  // Filter produk berdasarkan pencarian
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sorting produk berdasarkan harga
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori:
            </h2>
            <select
              className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-gray-700 dark:text-gray-200"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setSelectedCategory(category)} // Handler untuk memilih kategori
            />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <SearchAndSort
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-2 lg:col-span-3 text-center text-gray-600 dark:text-gray-300">
                  Tidak ada produk yang ditemukan.
                </p>
              )}
            </div>
          </div>
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Products;
