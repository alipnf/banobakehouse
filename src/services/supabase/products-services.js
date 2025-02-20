import { supabase } from "./supabase-config";

// Fungsi untuk mendapatkan semua produk
// products-services.js
export const getProducts = async (page = 1, pageSize = 10) => {
  try {
    const start = (page - 1) * pageSize;
    const end = page * pageSize - 1;

    let query = supabase.from("products").select("*", { count: "exact" });

    const { data, error, count } = await query.range(start, end);

    if (error) throw error;
    return {
      products: data,
      total: count,
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan produk baru
export const addProductItem = async (product) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui produk
export const updateProductItem = async (id, updatedProduct) => {
  try {
    // Ambil data produk sebelumnya untuk mendapatkan URL gambar lama
    const { data: existingProduct, error: fetchError } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();
    if (fetchError) throw fetchError;

    // Jika ada gambar lama, hapus dari bucket
    if (existingProduct?.image) {
      const urlParts = new URL(existingProduct.image).pathname.split("/");
      const folderName = urlParts[urlParts.length - 2]; // Nama folder (misalnya "products")
      const fileName = urlParts[urlParts.length - 1]; // Nama file
      const fullPath = `${folderName}/${fileName}`;
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([fullPath]);
      if (deleteError) throw deleteError;
    }

    // Update data produk
    const { data, error } = await supabase
      .from("products")
      .update(updatedProduct)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Fungsi untuk menghapus produk
export const deleteProductItem = async (id) => {
  try {
    // Ambil data produk untuk mendapatkan URL gambar
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();
    if (fetchError) throw fetchError;

    // Hapus gambar dari bucket jika ada
    if (product?.image) {
      const urlParts = new URL(product.image).pathname.split("/");
      const folderName = urlParts[urlParts.length - 2]; // Nama folder (misalnya "products")
      const fileName = urlParts[urlParts.length - 1]; // Nama file
      const fullPath = `${folderName}/${fileName}`;
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([fullPath]);
      if (deleteError) throw deleteError;
    }

    // Hapus produk dari database
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Fungsi untuk mengupload gambar ke bucket "images" dan mendapatkan URL-nya
export const uploadImageAndGetUrl = async (file) => {
  try {
    // Tentukan folder dan nama file unik
    const folderName = "products"; // Nama folder untuk produk
    const fileName = `${folderName}/${Date.now()}-${file.name}`; // Path dengan folder

    // Upload file ke bucket dengan folder
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images") // Nama bucket
      .upload(fileName, file, {
        contentType: file.type, // Tentukan tipe konten (misalnya image/jpeg)
      });
    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      throw uploadError;
    }

    // Dapatkan URL publik dari file yang diupload
    const { data: publicUrlData, error: urlError } = supabase.storage
      .from("images")
      .getPublicUrl(uploadData.path);
    if (urlError) {
      console.error("Error getting public URL:", urlError);
      throw urlError;
    }

    return publicUrlData.publicUrl; // Kembalikan URL publik
  } catch (error) {
    console.error("Error during image upload:", error.message || error);
    throw error;
  }
};

// Fungsi untuk mendapatkan produk berdasarkan kategori dengan pagination
export const getProductByCategory = async (
  category,
  page = 1,
  pageSize = 10,
) => {
  try {
    const start = (page - 1) * pageSize; // Hitung indeks awal
    const end = page * pageSize - 1; // Hitung indeks akhir

    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" }) // Menghitung total jumlah data
      .eq("category", category) // Filter berdasarkan kolom "category"
      .order("id", { ascending: true }) // Opsional: Urutkan berdasarkan kolom tertentu
      .range(start, end);

    if (error) throw error;

    return {
      products: data,
      total: count, // Total jumlah produk di database
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan produk berdasarkan nama dengan pagination
export const getProductByName = async (name, page = 1, pageSize = 10) => {
  try {
    const start = (page - 1) * pageSize; // Hitung indeks awal
    const end = page * pageSize - 1; // Hitung indeks akhir

    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" }) // Menghitung total jumlah data
      .ilike("name", `%${name}%`) // Filter berdasarkan kolom "name" dengan pencarian partial
      .order("id", { ascending: true }) // Opsional: Urutkan berdasarkan kolom tertentu
      .range(start, end);

    if (error) throw error;

    return {
      products: data,
      total: count, // Total jumlah produk di database
      page,
      pageSize,
    };
  } catch (error) {
    console.error("Error fetching products by name:", error);
    throw error;
  }
};
