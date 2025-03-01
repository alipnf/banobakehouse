import {
  getCategories,
  addCategoryItem,
  updateCategoryItem,
  deleteCategoryItem,
  uploadImageAndGetUrl,
} from "@/services/supabase/categories-service";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const useCategories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        description: editingCategory.description,
      });
      setImagePreview(editingCategory.image);
    }
  }, [editingCategory, reset]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Hanya file gambar yang diperbolehkan.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file tidak boleh lebih dari 5MB.");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let imageUrl = editingCategory?.image || "";
      if (imageFile) {
        imageUrl = await uploadImageAndGetUrl(imageFile);
      }

      const newCategory = {
        name: data.name,
        description: data.description,
        image: imageUrl,
      };

      if (editingCategory) {
        await updateCategoryItem(editingCategory.id, newCategory);
      } else {
        await addCategoryItem(newCategory);
      }

      setShowForm(false);
      setEditingCategory(null);
      setImagePreview(null);
      setImageFile(null);
      reset();

      const updatedData = await getCategories();
      setCategories(updatedData.categories || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      try {
        await deleteCategoryItem(categoryId);
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryId));
        alert("Kategori berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus kategori:", error.message);
        alert("Gagal menghapus kategori. Silakan coba lagi.");
      }
    }
  };

  return {
    showForm,
    setShowForm,
    editingCategory,
    setEditingCategory,
    categories,
    imagePreview,
    loading,
    register,
    handleSubmit,
    errors,
    reset,
    handleEdit,
    handleImageUpload,
    onSubmit,
    handleDelete,
    setImagePreview,
    setImageFile,
  };
};

export default useCategories;
