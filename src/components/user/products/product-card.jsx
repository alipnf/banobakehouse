import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProductStore from "@/store/use-product-store";
import { formatCurrency } from "@/utils/format-currency";
import { removeFromWishlist } from "@/services/supabase/wishlist-service";
import useAuthStore from "@/store/use-auth-store";
import useWishlistStore from "@/store/use-wishlist-store";
import { toast } from "react-toastify";

const ProductCard = ({ product, showRemoveButton = false }) => {
  const navigate = useNavigate();
  const { setSelectedProduct } = useProductStore();
  const { user } = useAuthStore();
  const userId = user?.id;
  const { wishlist, setWishlist } = useWishlistStore();

  const handleClick = () => {
    setSelectedProduct(product);
    navigate(`/product/${product.id}`);
  };

  const handleRemoveFromWishlist = async () => {
    try {
      await removeFromWishlist(userId, product.id);
      // Perbarui state wishlist secara lokal
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      setWishlist(updatedWishlist);
      toast("Produk berhasil dihapus dari wishlist!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast("Gagal menghapus produk dari wishlist.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col relative">
      <div
        className="relative w-full aspect-[4/3] overflow-hidden"
        onClick={handleClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center mt-1 gap-2 text-sm md:text-base text-secondary dark:text-primary mb-4">
          <div className="flex items-center gap-1 text-sm md:text-base text-secondary dark:text-primary">
            <h3 className="text-base md:text-lg font-semibold text-secondary dark:text-primary line-clamp-2">
              {product.name}
            </h3>
          </div>
        </div>
        <div className="mt-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <span className="text-base md:text-lg font-semibold text-secondary dark:text-primary">
            {formatCurrency(product.variants[0].price)}
          </span>
          <button className="w-full md:w-auto px-4 py-2 bg-secondary dark:bg-primary text-white dark:text-dark text-sm md:text-base rounded-lg hover:bg-secondary/90 dark:hover:bg-primary/90">
            Pesan
          </button>
          {showRemoveButton && (
            <button
              onClick={handleRemoveFromWishlist}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
              title="Hapus dari Wishlist"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
