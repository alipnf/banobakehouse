import { Link } from "react-router-dom";

const ProductNotFound = () => {
  return (
    <div className="min-h-screen bg-light dark:bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-secondary dark:text-light mb-4">
          Produk tidak ditemukan
        </h2>
        <Link
          to="/product"
          className="text-sm md:text-base text-secondary dark:text-light hover:underline"
        >
          Kembali ke Produk
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
