import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "@/services/supabase/categories-service";
import {
  getProducts,
  addProductItem,
  updateProductItem,
  deleteProductItem,
  uploadImageAndGetUrl,
} from "@/services/supabase/products-services";

const useProducts = () => {
  // State untuk produk
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [variants, setVariants] = useState([
    { name: "", price: "" }, // Default satu varian kosong
  ]);

  // State untuk kategori
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  // State untuk form dan gambar
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch data produk dari Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: fetchedProducts } = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorProducts("Gagal memuat produk.");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch data kategori dari Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { categories: fetchedCategories } = await getCategories();
        if (fetchedCategories.length === 0) {
          setErrorCategories(
            "Tidak ada kategori tersedia. Silakan tambah kategori terlebih dahulu.",
          );
        } else {
          setCategories(fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrorCategories("Gagal memuat kategori.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle upload gambar
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Silakan pilih file gambar.");
    }
  };

  // Tambah varian baru
  const addVariant = () => {
    setVariants((prev) => [...prev, { name: "", price: "" }]);
  };

  // Hapus varian berdasarkan indeks
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submit form (tambah/edit produk)
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      let imageUrl = editingProduct?.image;

      // Upload gambar jika ada file baru
      if (imageFile) {
        imageUrl = await uploadImageAndGetUrl(imageFile);
      }

      const newProduct = {
        name: data.name,
        category: data.category,
        variants: variants.map((variant) => ({
          name: variant.name,
          price: parseInt(variant.price),
        })),
        status: data.status,
        image: imageUrl,
      };

      if (editingProduct) {
        // Update produk
        const updatedProduct = await updateProductItem(
          editingProduct.id,
          newProduct,
        );
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProduct.id ? updatedProduct : product,
          ),
        );
      } else {
        // Tambah produk baru
        const addedProduct = await addProductItem(newProduct);
        setProducts((prev) => [...prev, addedProduct]);
      }

      // Reset state form
      setShowForm(false);
      setEditingProduct(null);
      setImagePreview(null);
      setImageFile(null);
      setVariants([{ name: "", price: "" }]); // Reset varian ke default
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan produk.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk membuka form edit
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setImagePreview(product.image); // Set preview gambar

    // Set variants dari produk yang sedang diedit
    if (product.variants && product.variants.length > 0) {
      setVariants(product.variants);
    } else {
      setVariants([{ name: "", price: "" }]); // Reset ke satu varian kosong
    }

    setShowForm(true);
  };

  // Handle hapus produk
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProductItem(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Terjadi kesalahan saat menghapus produk.");
      }
    }
  };

  // Fungsi untuk membuka form tambah produk
  const handleAddProduct = () => {
    setEditingProduct(null); // Reset editingProduct
    setVariants([{ name: "", price: "" }]); // Reset ke satu varian kosong
    setImagePreview(null); // Reset preview gambar
    setImageFile(null); // Reset file gambar
    setShowForm(true);
  };

  return {
    products,
    setProducts,
    loadingProducts,
    errorProducts,
    categories,
    loadingCategories,
    errorCategories,
    showForm,
    setShowForm,
    editingProduct,
    setEditingProduct,
    imagePreview,
    setImagePreview,
    imageFile,
    setImageFile,
    loading,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    handleImageUpload,
    handleDelete,
    addVariant,
    removeVariant,
    variants,
    setVariants,
    handleEditProduct,
    handleAddProduct,
  };
};

export default useProducts;
