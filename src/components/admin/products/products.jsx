import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react";
import useProducts from "@/hooks/use-products";
import { formatCurrency } from "@/utils/format-currency";

const Products = () => {
  const {
    showForm,
    setShowForm,
    editingProduct,
    setEditingProduct,
    products,
    categories,
    loadingCategories,
    errorCategories,
    imagePreview,
    register,
    handleSubmit,
    reset,
    errors,
    onSubmit,
    handleImageUpload,
    handleDelete,
    loading,
    setImagePreview,
    setImageFile,
    variants,
    addVariant,
    removeVariant,
    handleEditProduct,
    handleAddProduct,
    setVariants,
  } = useProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Produk</h1>
        <button
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
          onClick={handleAddProduct}
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
            {/* Nama Produk */}
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

            {/* Deskripsi Produk */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Deskripsi Produk
              </label>
              <textarea
                {...register("description", {
                  required: "Deskripsi produk diperlukan",
                })}
                defaultValue={editingProduct?.description}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan deskripsi produk"
                rows="4"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Kategori */}
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

            {/* Variasi Harga */}
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Variasi Harga
              </label>
              {variants.map((variant, index) => (
                <div key={index} className="flex items-center space-x-4 mb-2">
                  {/* Input Nama Varian */}
                  <input
                    {...register(`variants.${index}.name`, {
                      required: "Nama varian diperlukan",
                    })}
                    type="text"
                    value={variant.name}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((v, i) =>
                          i === index ? { ...v, name: e.target.value } : v,
                        ),
                      )
                    }
                    placeholder="Nama Varian (misal: Custom Size)"
                    className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  {errors.variants?.[index]?.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.variants[index].name.message}
                    </p>
                  )}

                  {/* Input Harga Varian */}
                  <input
                    {...register(`variants.${index}.price`, {
                      required: "Harga varian diperlukan",
                    })}
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      setVariants((prev) =>
                        prev.map((v, i) =>
                          i === index ? { ...v, price: e.target.value } : v,
                        ),
                      )
                    }
                    placeholder="Harga"
                    className="w-32 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  />

                  {errors.variants?.[index]?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.variants[index].price.message}
                    </p>
                  )}

                  {/* Tombol Hapus Varian */}
                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              ))}

              {/* Tombol Tambah Varian */}
              <button
                type="button"
                onClick={addVariant}
                className="px-3 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                Tambah Varian
              </button>
              {errors.variants && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.variants.message}
                </p>
              )}
            </div>

            {/* Status */}
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

            {/* Gambar */}
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
                  {...(imagePreview
                    ? {}
                    : register("image", {
                        required: "Gambar diperlukan",
                      }))}
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

            {/* Tombol Simpan/Batal */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                  setImagePreview(null);
                  setImageFile(null);
                  reset();
                  setVariants([{ name: "", price: "" }]);
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
                  Deskripsi
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
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary/70 uppercase tracking-wider">
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
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {product.variants.map((variant, index) => (
                      <div key={index}>
                        {variant.name}: {formatCurrency(variant.price)}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${product.status === "Tersedia" ? "bg-green-100 text-green-800" : ""}
                        ${product.status === "Habis" ? "bg-red-100 text-red-800" : ""}
                      `}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="p-2 text-secondary hover:bg-gray-100 rounded-lg"
                        onClick={() => handleEditProduct(product)}
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
