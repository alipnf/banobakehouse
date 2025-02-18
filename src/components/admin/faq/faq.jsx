import useFaq from "@/hooks/use-faq";
import { Plus, Edit2, Trash2 } from "lucide-react";

const FAQ = () => {
  const {
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
  } = useFaq();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">FAQ</h1>
        <button
          onClick={() => {
            if (faqs.length >= 5) {
              setError("Maksimal 5 FAQ. Hapus salah satu FAQ terlebih dahulu.");
            } else {
              setShowForm(true);
              reset(); // Reset form jika menambah FAQ baru
            }
          }}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah FAQ
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            {editingFaq ? "Edit FAQ" : "Tambah FAQ Baru"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Pertanyaan
              </label>
              <input
                type="text"
                {...register("question", {
                  required: "Pertanyaan wajib diisi",
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan pertanyaan"
              />
              {errors.question && (
                <p className="text-red-500 text-sm">
                  {errors.question.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Jawaban
              </label>
              <textarea
                {...register("answer", { required: "Jawaban wajib diisi" })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={4}
                placeholder="Masukkan jawaban"
              />
              {errors.answer && (
                <p className="text-red-500 text-sm">{errors.answer.message}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setShowForm(false);
                  setEditingFaq(null);
                }}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                {editingFaq ? "Simpan Perubahan" : "Tambah FAQ"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-y-auto">
          {" "}
          {/* Tambahkan max-height dan overflow-y */}
          <table className="w-full">
            {/* Header tabel */}
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Pertanyaan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                  Jawaban
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider w-[80px]">
                  Aksi
                </th>
              </tr>
            </thead>
            {/* Body tabel */}
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.length > 0 ? (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-secondary">
                        {faq.question}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-secondary">{faq.answer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-[80px]">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setEditingFaq(faq);
                            reset({
                              question: faq.question,
                              answer: faq.answer,
                            });
                            setShowForm(true);
                          }}
                          className="p-2 text-secondary hover:bg-gray-100 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(faq.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada FAQ yang tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
