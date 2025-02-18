import useCategories from "@/hooks/use-categories";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

const Categories = () => {
  const {
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
  } = useCategories();

  return (
    <div className="space-y-6 mb-5 md:mb-10">
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

      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                {...register("name", { required: "Nama kategori diperlukan" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan nama kategori"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Deskripsi
              </label>
              <textarea
                {...register("description", {
                  required: "Deskripsi diperlukan",
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={3}
                placeholder="Masukkan deskripsi kategori"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
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
                  {...register("image", {
                    required: "Gambar diperlukan",
                  })}
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
                  setEditingCategory(null);
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
                  : editingCategory
                    ? "Simpan Perubahan"
                    : "Tambah Kategori"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table (tetap sama seperti sebelumnya) */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-10 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-10 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-10 py-3 text-right text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-10 py-4 whitespace-nowrap">
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
                  <td className="px-10 py-4 text-sm text-secondary">
                    {category.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 text-secondary hover:bg-gray-100 rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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

export default Categories;
