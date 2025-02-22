import { Minus, Plus, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import ProductNotFound from "./product-not-found";
import useProductDetail from "@/hooks/user/use-product-detail";

const ProductDetail = () => {
  const {
    quantity,
    setQuantity,
    selectedSize,
    setSelectedSize,
    product,
    id,
    navigate,
    totalPrice,
    openWhatsApp,
    addWishlist,
  } = useProductDetail();

  // Validasi produk
  if (!product || product.id !== id) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm md:text-base text-secondary dark:text-light hover:text-secondary/70 dark:hover:text-light/70 mb-3 md:mb-4"
        >
          <ArrowLeft className="w-2 h-2 md:w-5 md:h-5 mr-2" />
          Kembali
        </button>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Gambar Produk */}
          <div className="relative">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Informasi Produk */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary dark:text-light mb-10">
                {product.name}
              </h1>
              <p className="text-sm md:text-base text-secondary/70 dark:text-light/70 mb-4">
                {product.description}
              </p>
            </div>

            {/* Pilihan Varian */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-secondary dark:text-light mb-3">
                Varian
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedSize(variant.name)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg border ${
                      selectedSize === variant.name
                        ? "border-secondary bg-secondary text-white dark:border-light dark:bg-light dark:text-dark"
                        : "border-secondary/10 text-secondary hover:border-secondary dark:border-light/20 dark:text-light dark:hover:border-light"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Jumlah */}
            <div>
              <h3 className="text-sm md:text-base font-semibold text-secondary dark:text-light mb-3">
                Jumlah
              </h3>
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 md:p-2 rounded-lg border border-secondary/10 hover:border-secondary dark:border-light/20 dark:hover:border-light"
                >
                  <Minus className="w-4 h-4 text-secondary dark:text-light" />
                </button>
                <span className="text-base md:text-lg font-medium text-secondary dark:text-light">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 md:p-2 rounded-lg border border-secondary/10 hover:border-secondary dark:border-light/20 dark:hover:border-light"
                >
                  <Plus className="w-4 h-4 text-secondary dark:text-light" />
                </button>
              </div>
            </div>

            {/* Harga Total dan Tombol */}
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
              <div className="md:mr-4">
                <p className="text-xs md:text-sm text-secondary/70 dark:text-light/70">
                  Harga Total
                </p>
                <p className="text-2xl md:text-3xl font-bold text-secondary dark:text-light">
                  {formatCurrency(totalPrice)}
                </p>
              </div>
              <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:gap-4 w-full md:w-auto">
                <button
                  className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-light dark:text-dark dark:hover:bg-light/90"
                  onClick={addWishlist}
                >
                  Simpan Kue
                </button>
                <button
                  className="px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base bg-secondary text-white rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-light dark:text-dark dark:hover:bg-light/90"
                  disabled={!selectedSize}
                  onClick={openWhatsApp}
                >
                  Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
