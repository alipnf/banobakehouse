import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getAllFaqs, // Mengganti getFAQ dengan getAllFaqs
  addFaq, // Mengganti addFAQItem dengan addFaq
  updateFaq, // Menambahkan fungsi updateFaq
  deleteFaq, // Mengganti removeFAQItem dengan deleteFaq
} from "@/services/supabase/faq-service";

const useFaq = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(""); // State untuk pesan error

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch FAQs saat komponen dimuat
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const fetchedFAQs = await getAllFaqs(); // Menggunakan getAllFaqs
        setFaqs(fetchedFAQs); // Set faqs langsung dari Supabase
      } catch (err) {
        setError("Gagal mengambil FAQ. Silakan coba lagi.");
        console.error(err);
      }
    };
    fetchFAQs();
  }, []);

  // Handler untuk menambah atau memperbarui FAQ
  const onSubmit = async (data) => {
    if (faqs.length >= 5 && !editingFaq) {
      setError("Maksimal 5 FAQ. Hapus salah satu FAQ terlebih dahulu.");
      return;
    }
    setError(""); // Reset error message

    try {
      if (editingFaq) {
        // Jika sedang mengedit FAQ
        await updateFaq(editingFaq.id, data.question, data.answer); // Menggunakan updateFaq
        setFaqs((prevFaqs) =>
          prevFaqs.map((faq) =>
            faq.id === editingFaq.id ? { ...faq, ...data } : faq,
          ),
        );
      } else {
        // Jika menambah FAQ baru
        const newFaq = await addFaq(data.question, data.answer); // Menggunakan addFaq
        setFaqs((prevFaqs) => [...prevFaqs, newFaq[0]]); // Supabase mengembalikan array
      }

      // Reset form dan state
      reset();
      setShowForm(false);
      setEditingFaq(null);
    } catch (err) {
      setError("Gagal menyimpan FAQ. Silakan coba lagi.");
      console.error(err);
    }
  };

  // Handler untuk menghapus FAQ
  const handleDelete = async (id) => {
    try {
      await deleteFaq(id); // Menggunakan deleteFaq
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
    } catch (err) {
      console.error(err);

      setError("Gagal menghapus FAQ. Silakan coba lagi.");
    }
  };

  return {
    showForm,
    setShowForm,
    editingFaq,
    setEditingFaq,
    faqs,
    error,
    setError,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    handleDelete,
  };
};

export default useFaq;
