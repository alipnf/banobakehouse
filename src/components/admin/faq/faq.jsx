import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  getFAQ,
  addFAQItem,
  removeFAQItem,
  saveFAQ,
} from "@/services/firebase/faq-services";

const FAQ = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchFAQs = async () => {
      const fetchedFAQs = await getFAQ();
      if (fetchedFAQs && fetchedFAQs.faqs) {
        setFaqs(fetchedFAQs.faqs);
      }
    };
    fetchFAQs();
  }, []);

  // Handler untuk input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler untuk menambah atau memperbarui FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingFaq) {
      // Jika sedang mengedit FAQ
      const updatedFAQs = faqs.map((faq) =>
        faq.id === editingFaq ? { ...faq, ...formData } : faq,
      );
      await saveFAQ({ faqs: updatedFAQs });
      setFaqs(updatedFAQs);
    } else {
      // Jika menambah FAQ baru
      const newFAQ = { id: Date.now().toString(), ...formData };
      await addFAQItem(newFAQ);
      setFaqs((prevFaqs) => [...prevFaqs, newFAQ]);
    }

    // Reset form dan state
    setFormData({ question: "", answer: "" });
    setShowForm(false);
    setEditingFaq(null);
  };

  // Handler untuk menghapus FAQ
  const handleDelete = async (id) => {
    await removeFAQItem(id);
    setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">FAQ</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah FAQ
        </button>
      </div>
      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            {editingFaq ? "Edit FAQ" : "Tambah FAQ Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Pertanyaan
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="Masukkan pertanyaan"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">
                Jawaban
              </label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                rows={4}
                placeholder="Masukkan jawaban"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingFaq(null);
                  setFormData({ question: "", answer: "" });
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
        <div className="overflow-x-auto">
          <table className="w-full">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {faqs.map((faq) => (
                <tr key={faq.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-[200px]">
                    <div className="text-sm font-medium text-secondary truncate">
                      {faq.question}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-[300px]">
                    <div className="text-sm text-secondary truncate">
                      {faq.answer}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-[80px]">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingFaq(faq.id);
                          setFormData({
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
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
    </div>
  );
};

export default FAQ;
