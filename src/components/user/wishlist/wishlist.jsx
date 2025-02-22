import { useEffect } from "react";
import { ProductCard } from "@/components/user/products";
import { getWishlist } from "@/services/supabase/wishlist-service";
import useAuthStore from "@/store/use-auth-store";
import useWishlistStore from "@/store/use-wishlist-store";

const Wishlist = () => {
  const { wishlist, setWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  const userId = user?.id;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistProducts = await getWishlist(userId);
        setWishlist(wishlistProducts);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [setWishlist, userId]);

  return (
    <div className="min-h-screen bg-light dark:bg-dark py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-secondary dark:text-primary mb-4">
          Kue yang Disimpan
        </h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="col-span-2 lg:col-span-3 text-center text-secondary dark:text-primary">
            Tidak ada produk yang ditemukan.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
