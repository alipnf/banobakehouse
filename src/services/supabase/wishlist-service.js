import { supabase } from "./supabase-config";

// Fungsi untuk mendapatkan semua produk dalam wishlist pengguna
export const getWishlist = async (userId, page = 1, pageSize = 10) => {
  try {
    // Hitung offset berdasarkan halaman dan ukuran halaman
    const start = (page - 1) * pageSize;
    const end = page * pageSize - 1;

    // Ambil product_id dari wishlist berdasarkan user_id
    const { data: wishlistData, error: wishlistError } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", userId);

    if (wishlistError) throw wishlistError;

    // Jika tidak ada produk di wishlist, kembalikan array kosong
    if (!wishlistData || wishlistData.length === 0) {
      return {
        products: [],
        total: 0,
        page,
        pageSize,
      };
    }

    // Dapatkan product_id dari wishlist
    const productIds = wishlistData.map((item) => item.product_id);

    // Ambil detail produk dari tabel products berdasarkan product_ids
    const {
      data: products,
      error: productError,
      count,
    } = await supabase
      .from("products")
      .select("*", { count: "exact" }) // Menggunakan count untuk mendapatkan total produk
      .in("id", productIds)
      .range(start, end); // Terapkan pagination

    if (productError) throw productError;

    return {
      products,
      total: count, // Total produk di wishlist
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan produk ke wishlist
export const addToWishlist = async (userId, productId) => {
  try {
    const { data, error } = await supabase
      .from("wishlist")
      .insert([{ user_id: userId, product_id: productId }]);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Fungsi untuk menghapus produk dari wishlist
export const removeFromWishlist = async (userId, productId) => {
  try {
    const { data, error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};
