import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getFAQ,
  addFAQItem,
  removeFAQItem,
  saveFAQ,
} from "@/services/firebase/faq-services";

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
      const fetchedFAQs = await getFAQ();
      if (fetchedFAQs && fetchedFAQs.faqs) {
        setFaqs(fetchedFAQs.faqs);
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

    if (editingFaq) {
      // Jika sedang mengedit FAQ
      const updatedFAQs = faqs.map((faq) =>
        faq.id === editingFaq ? { ...faq, ...data } : faq,
      );
      await saveFAQ({ faqs: updatedFAQs });
      setFaqs(updatedFAQs);
    } else {
      // Jika menambah FAQ baru
      const newFAQ = { id: Date.now().toString(), ...data };
      await addFAQItem(newFAQ);
      setFaqs((prevFaqs) => [...prevFaqs, newFAQ]);
    }

    // Reset form dan state
    reset();
    setShowForm(false);
    setEditingFaq(null);
  };

  // Handler untuk menghapus FAQ
  const handleDelete = async (id) => {
    await removeFAQItem(id);
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
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
