import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react";
import { getCategories } from "@/services/supabase/categories-service";

const productsData = [
  {
    id: 1,
    name: "Chocolate Heaven",
    category: "Specialty",
    price: 250000,
    stock: 15,
    status: "Tersedia",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
  },
  // ...data produk lainnya
];

const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Mengambil data kategori dari Supabase
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

  const formatPrice = (price) => {
    if (!price) return "Rp0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Silakan pilih file gambar.");
    }
  };

  const onSubmit = (data) => {
    setLoading(true);

    setTimeout(() => {
      const newProduct = {
        id: editingProduct ? editingProduct.id : Date.now(),
        name: data.name,
        category: data.category,
        price: parseInt(data.price),
        stock: parseInt(data.stock),
        status: data.status,
        image: imageFile
          ? URL.createObjectURL(imageFile)
          : editingProduct?.image,
      };

      if (editingProduct) {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editingProduct.id ? newProduct : product,
          ),
        );
      } else {
        setProducts((prev) => [...prev, newProduct]);
      }

      setLoading(false);
      setShowForm(false);
      setEditingProduct(null);
      setImagePreview(null);
      setImageFile(null);
      reset();
    }, 1000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Produk</h1>
        <button
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Produk
        </button>
      </div>

      {/* Form Tambah/Edit Produk */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Nama Produk
              </label>
              <input
                type="text"
                {...register("name", { required: "Nama produk diperlukan" })}
                defaultValue={editingProduct?.name}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan nama produk"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Kategori
              </label>
              {loadingCategories ? (
                <p>Loading...</p>
              ) : errorCategories ? (
                <p className="text-red-500">{errorCategories}</p>
              ) : categories.length === 0 ? (
                <div>
                  <p className="text-red-500">
                    Tidak ada kategori tersedia. Silakan tambah kategori
                    terlebih dahulu.
                  </p>
                  <button
                    className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                    onClick={() =>
                      alert(
                        "Silakan buka halaman kategori untuk menambahkan kategori baru.",
                      )
                    }
                  >
                    Tambah Kategori
                  </button>
                </div>
              ) : (
                <select
                  {...register("category", { required: "Kategori diperlukan" })}
                  defaultValue={editingProduct?.category}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Harga
              </label>
              <input
                type="number"
                {...register("price", { required: "Harga diperlukan" })}
                defaultValue={editingProduct?.price}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan harga"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Stok
              </label>
              <input
                type="number"
                {...register("stock", { required: "Stok diperlukan" })}
                defaultValue={editingProduct?.stock}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan stok"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Status
              </label>
              <select
                {...register("status", { required: "Status diperlukan" })}
                defaultValue={editingProduct?.status}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="Tersedia">Tersedia</option>
                <option value="Habis">Habis</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Gambar
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="image-upload"
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  Pilih Gambar
                </label>
                <input
                  {...register("image", { required: !editingProduct })}
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setImagePreview(null);
                  setImageFile(null);
                  reset();
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                {loading
                  ? "Menyimpan..."
                  : editingProduct
                    ? "Simpan Perubahan"
                    : "Tambah Produk"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabel Produk */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="ml-3 font-medium text-secondary">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${product.status === "Tersedia" ? "bg-green-100 text-green-800" : ""}
                        ${product.status === "Habis" ? "bg-red-100 text-red-800" : ""}
                        ${!["Tersedia", "Habis"].includes(product.status) ? "bg-gray-100 text-gray-800" : ""}
                      `}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="p-2 text-secondary hover:bg-gray-100 rounded-lg"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
