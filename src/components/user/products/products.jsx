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

  // Filter produk berdasarkan pencarian
  // const filteredProducts = products.filter((product) =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  // );

  // Sorting produk berdasarkan harga
  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortBy === "price-low") return a.price - b.price;
  //   if (sortBy === "price-high") return b.price - a.price;
  //   return 0;
  // });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block">
            <CategorySidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col">
            <SearchAndSort
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              // sortBy={sortBy}
              // setSortBy={setSortBy}
            />

            {/* Produk */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-2 lg:col-span-3 text-center text-gray-600 dark:text-gray-300">
                  Tidak ada produk yang ditemukan.
                </p>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalItems={totalProducts}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
