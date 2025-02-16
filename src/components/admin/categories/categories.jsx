import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import {
  getCategories,
  addCategoryItem,
  updateCategoryItem,
  uploadImageAndGetUrl,
} from "@/services/firebase/categories-service";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State untuk preview gambar
  const [imageFile, setImageFile] = useState(null); // State untuk menyimpan file gambar
  const [loading, setLoading] = useState(false); // State untuk loading saat upload

  useEffect(() => {
    // Fungsi untuk mengambil data kategori dari Firestore
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []); // Simpan data ke state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (categoryId) => {
    setEditingCategory(categoryId);
    setShowForm(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Simpan file gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview gambar
      };
      reader.readAsDataURL(file); // Baca file sebagai URL data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Dapatkan nilai dari form
      const name = e.target.name.value;
      const description = e.target.description.value;

      // Upload gambar ke Firebase Storage jika ada file gambar
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageAndGetUrl(imageFile); // Gunakan fungsi dari service
      }

      // Buat objek kategori baru
      const newCategory = {
        id: editingCategory || Date.now(), // Gunakan ID yang ada atau buat baru
        name,
        description,
        image: imageUrl || "", // Gunakan URL gambar atau kosong jika tidak ada
      };

      // Simpan kategori ke Firestore
      if (editingCategory) {
        await updateCategoryItem(editingCategory, newCategory);
      } else {
        await addCategoryItem(newCategory);
      }

      // Reset state
      setShowForm(false);
      setEditingCategory(null);
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Kategori</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Kategori
        </button>
      </div>
      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan nama kategori"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={3}
                placeholder="Masukkan deskripsi kategori"
                required
              />
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
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                  setImagePreview(null); // Reset preview gambar
                  setImageFile(null); // Reset file gambar
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
                  : editingCategory
                    ? "Simpan Perubahan"
                    : "Tambah Kategori"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Categories Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="ml-3 font-medium text-secondary">
                        {category.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="p-2 text-secondary hover:bg-gray-100 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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

export default Categories;
