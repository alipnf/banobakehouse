import { ProductCard } from "../products";

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

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="col-span-2 lg:col-span-3 text-center text-gray-600 dark:text-gray-300">
            Tidak ada produk yang ditemukan.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
