import { supabase } from "./supabase-config";

// Mengambil semua kategori
export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return { categories: data };
  } catch (error) {
    console.error("Gagal mengambil kategori:", error.message);
    throw error;
  }
};

// Menambahkan kategori baru
export const addCategoryItem = async (category) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([category]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal menambahkan kategori:", error.message);
    throw error;
  }
};

// Memperbarui kategori (Hapus gambar lama jika ada)
export const updateCategoryItem = async (id, updatedCategory, oldImagePath) => {
  try {
    // Jika ada gambar lama, hapus dulu dari storage
    if (oldImagePath) {
      const imagePath = oldImagePath.replace(
        `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/`,
        "",
      );

      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([imagePath]);

      if (deleteError) throw deleteError;
      console.log("Gambar lama berhasil dihapus:", imagePath);
    }

    // Update kategori di database
    const { data, error } = await supabase
      .from("categories")
      .update(updatedCategory)
      .eq("id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal memperbarui kategori:", error.message);
    throw error;
  }
};

// Menghapus kategori (dan gambar terkait)
export const deleteCategoryItem = async (id, imageUrl) => {
  try {
    // Hapus gambar dari storage jika ada
    if (imageUrl) {
      const imagePath = imageUrl.replace(
        `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/`,
        "",
      );

      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([imagePath]);

      if (deleteError) throw deleteError;
      console.log("Gambar kategori berhasil dihapus:", imagePath);
    }

    // Hapus kategori dari database
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal menghapus kategori:", error.message);
    throw error;
  }
};

// Mengunggah gambar ke Supabase dan mendapatkan URL-nya
export const uploadImageAndGetUrl = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;

    // Upload file ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) throw error;
    console.log("Upload berhasil:", data);

    if (!data) throw new Error("Upload gagal, data kosong");

    // Buat URL publik gambar
    const publicURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
    console.log("URL gambar publik:", publicURL);

    return publicURL;
  } catch (error) {
    console.error("Gagal mengunggah gambar:", error.message);
    throw error;
  }
};
