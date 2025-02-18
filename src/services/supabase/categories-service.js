import { supabase } from "./supabase-config";

// Fungsi untuk mendapatkan semua kategori
export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) throw error;
    return { categories: data };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Fungsi untuk menambahkan kategori baru
export const addCategoryItem = async (category) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert([category])
      .select();
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui kategori
export const updateCategoryItem = async (id, updatedCategory) => {
  try {
    // Ambil data kategori sebelumnya untuk mendapatkan URL gambar lama
    const { data: existingCategory, error: fetchError } = await supabase
      .from("categories")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Jika ada gambar lama, hapus dari bucket
    if (existingCategory?.image) {
      const urlParts = new URL(existingCategory.image).pathname.split("/");
      const folderName = urlParts[urlParts.length - 2]; // Nama folder (misalnya "categories")
      const fileName = urlParts[urlParts.length - 1]; // Nama file
      const fullPath = `${folderName}/${fileName}`;
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([fullPath]);
      if (deleteError) throw deleteError;
    }

    // Update data kategori
    const { data, error } = await supabase
      .from("categories")
      .update(updatedCategory)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Fungsi untuk menghapus kategori
export const deleteCategoryItem = async (id) => {
  try {
    // Ambil data kategori untuk mendapatkan URL gambar
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("image")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Hapus gambar dari bucket jika ada
    if (category?.image) {
      const urlParts = new URL(category.image).pathname.split("/");
      const folderName = urlParts[urlParts.length - 2]; // Nama folder (misalnya "categories")
      const fileName = urlParts[urlParts.length - 1]; // Nama file
      const fullPath = `${folderName}/${fileName}`;
      const { error: deleteError } = await supabase.storage
        .from("images")
        .remove([fullPath]);
      if (deleteError) throw deleteError;
    }

    // Hapus kategori dari database
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// Fungsi untuk mengupload gambar ke bucket "images" dan mendapatkan URL-nya
export const uploadImageAndGetUrl = async (file) => {
  try {
    // Tentukan folder dan nama file unik
    const folderName = "categories"; // Nama folder untuk kategori
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
