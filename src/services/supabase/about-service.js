import { supabase } from "./supabase-config";

// Mengambil informasi web
export const getWebInfo = async () => {
  try {
    const { data, error } = await supabase.from("about").select("*").single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal mengambil informasi web:", error.message);
    throw error;
  }
};

// Menyimpan informasi web
export const saveWebInfo = async (info) => {
  try {
    const { data, error } = await supabase
      .from("about")
      .update(info)
      .eq("id", 1); // Pastikan hanya ada satu baris dengan id=1
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal menyimpan informasi web:", error.message);
    throw error;
  }
};

// Menambahkan media sosial
export const addSocialMedia = async (newItem) => {
  try {
    const { data, error } = await supabase.rpc("add_social_media", {
      new_item: newItem,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal menambahkan media sosial:", error.message);
    throw error;
  }
};

// Menghapus media sosial
export const removeSocialMedia = async (id) => {
  try {
    console.log("Menghapus media sosial dengan ID:", id);
    const { error } = await supabase.rpc("remove_social_media", {
      item_id: id,
    });
    if (error) {
      console.error("Gagal menghapus media sosial:", error.message);
      alert("Gagal menghapus media sosial. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error saat menghapus media sosial:", error.message);
    alert("Terjadi kesalahan. Silakan coba lagi.");
  }
};
