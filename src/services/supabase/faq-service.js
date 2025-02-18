import { supabase } from "./supabase-config";

// Mengambil semua FAQ
export const getAllFaqs = async () => {
  try {
    const { data, error } = await supabase.from("faqs").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal mengambil FAQ:", error.message);
    throw error;
  }
};

// Menambahkan FAQ baru
export const addFaq = async (question, answer) => {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .insert([{ question, answer }])
      .select(); // Gunakan .select() untuk mendapatkan data yang baru ditambahkan
    if (error) throw error;
    return data; // Data adalah array, jadi pastikan untuk mengembalikan array tersebut
  } catch (error) {
    console.error("Gagal menambahkan FAQ:", error.message);
    throw error;
  }
};

// Memperbarui FAQ berdasarkan ID
export const updateFaq = async (id, updatedQuestion, updatedAnswer) => {
  try {
    const { data, error } = await supabase
      .from("faqs")
      .update({
        question: updatedQuestion,
        answer: updatedAnswer,
      })
      .eq("id", id); // Pastikan hanya memperbarui FAQ dengan ID tertentu
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Gagal memperbarui FAQ:", error.message);
    throw error;
  }
};

// Menghapus FAQ berdasarkan ID
export const deleteFaq = async (id) => {
  try {
    console.log("Menghapus FAQ dengan ID:", id);
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (error) {
      console.error("Gagal menghapus FAQ:", error.message);
      alert("Gagal menghapus FAQ. Silakan coba lagi.");
    }
  } catch (error) {
    console.error("Error saat menghapus FAQ:", error.message);
    alert("Terjadi kesalahan. Silakan coba lagi.");
  }
};
