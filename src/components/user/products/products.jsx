import { CategorySidebar, Pagination, ProductCard, SearchAndSort } from "./";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Chocolate Heaven",
    category: "Specialty",
    price: 250000,
    rating: 4.8,
    reviews: 120,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
    description:
      "Kue cokelat premium dengan lapisan ganache yang lembut dan hiasan cokelat Belgian berkualitas tinggi. Sempurna untuk pecinta cokelat sejati.",
    sizes: ["16cm", "20cm", "24cm"],
  },
  {
    id: 2,
    name: "Strawberry Delight",
    category: "Specialty",
    price: 275000,
    rating: 4.7,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      "Kue vanilla lembut dengan lapisan krim stroberi segar dan potongan buah stroberi pilihan. Cocok untuk pencinta buah.",
    sizes: ["16cm", "20cm", "24cm"],
  },
  {
    id: 3,
    name: "Wedding Classic",
    category: "Wedding",
    price: 1500000,
    rating: 4.8,
    reviews: 78,
    image:
      "https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      "Kue pernikahan klasik bertingkat dengan hiasan fondant elegan. Tersedia dalam berbagai ukuran sesuai jumlah tamu.",
    sizes: ["3 Tingkat", "4 Tingkat", "5 Tingkat"],
  },
  {
    id: 4,
    name: "Butter Cookies",
    category: "Cookies",
    price: 75000,
    rating: 4.6,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    description:
      "Kukis butter klasik yang renyah dan lembut. Dibuat dengan butter premium Selandia Baru.",
    sizes: ["250gr", "500gr", "1kg"],
  },
];

const categories = [
  { name: "Kue Ulang Tahun", count: 12 },
  { name: "Kue Pernikahan", count: 8 },
  { name: "Kue Kering", count: 15 },
  { name: "Cupcakes", count: 20 },
];

const Products = () => {
  const [sortBy, setSortBy] = useState("price-low");
  const [searchQuery, setSearchQuery] = useState("");

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
            <select className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-gray-700 dark:text-gray-200">
              {categories.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <CategorySidebar categories={categories} />
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
