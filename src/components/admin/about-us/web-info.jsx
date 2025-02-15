import { useState } from "react";
import { Save, Phone, Mail, MapPin, Plus, Trash2 } from "lucide-react";

const WebInfo = () => {
  const [formData, setFormData] = useState({
    whatsapp: "+62 123 456 789",
    email: "info@banobakehouse.com",
    address: "Jl. Cake Street No. 123, Jakarta",
  });

  const [socialMedia, setSocialMedia] = useState([
    {
      id: "1",
      platform: "Facebook",
      url: "https://facebook.com/banobakehouse",
    },
    {
      id: "2",
      platform: "Instagram",
      url: "https://instagram.com/banobakehouse",
    },
  ]);

  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving data:", { ...formData, socialMedia });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSocialMedia = (e) => {
    e.preventDefault();
    if (newPlatform && newUrl) {
      setSocialMedia((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          platform: newPlatform,
          url: newUrl,
        },
      ]);
      setNewPlatform("");
      setNewUrl("");
    }
  };

  const handleRemoveSocialMedia = (id) => {
    setSocialMedia((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Tentang Bano</h1>
        <button
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90"
        >
          <Save className="w-5 h-5 mr-2" />
          Simpan Perubahan
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Informasi Kontak dan Alamat */}
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-secondary">
              Informasi Kontak dan Alamat
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Nomor WhatsApp
                </label>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-secondary/70 mr-2" />
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="+62 xxx-xxxx-xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Email
                </label>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-secondary/70 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-1">
                  Alamat
                </label>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-secondary/70 mr-2" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Alamat lengkap"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media Sosial */}
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary">
                Media Sosial
              </h2>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("addSocialMediaForm")
                    ?.classList.remove("hidden")
                }
                className="flex items-center px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tambah Media Sosial
              </button>
            </div>

            {/* Add Social Media Form */}
            <div
              id="addSocialMediaForm"
              className="hidden space-y-4 p-4 bg-gray-50 rounded-lg"
            >
              <h3 className="text-sm font-medium text-secondary">
                Tambah Media Sosial Baru
              </h3>
              <form onSubmit={handleAddSocialMedia} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      Platform
                    </label>
                    <input
                      type="text"
                      value={newPlatform}
                      onChange={(e) => setNewPlatform(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="Contoh: Facebook, Twitter, dll"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1">
                      URL
                    </label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="https://"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("addSocialMediaForm")
                        ?.classList.add("hidden");
                      setNewPlatform("");
                      setNewUrl("");
                    }}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-secondary text-white rounded-lg hover:bg-secondary/90 text-sm"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-secondary/70 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-secondary/70 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {socialMedia.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">{item.platform}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-secondary">
                          {item.url}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialMedia(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebInfo;
