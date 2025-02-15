import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, Phone, Mail, MapPin, Plus, Trash2, Car } from "lucide-react";
import {
  getWebInfo,
  saveWebInfo,
  addSocialMedia,
  removeSocialMedia,
} from "@/services/firebase/about-service";

const WebInfo = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [initialData, setInitialData] = useState(null); // State untuk menyimpan data awal

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange", // Validasi dilakukan saat perubahan input
  });

  // Fetch data saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWebInfo();
      if (data) {
        const initialFormData = {
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
          grab: data.grab || "",
        };
        reset(initialFormData);
        setInitialData(initialFormData); // Simpan data awal
        setSocialMedia(data.socialMedia || []);
      }
    };
    fetchData();
  }, [reset]);

  // Watch form values to detect changes
  const formData = watch(); // Mendapatkan nilai terkini dari form

  // Fungsi untuk memeriksa apakah ada perubahan data
  const hasChanges = () => {
    if (!initialData) return false;
    return (
      formData.whatsapp !== initialData.whatsapp ||
      formData.email !== initialData.email ||
      formData.address !== initialData.address ||
      formData.grab !== initialData.grab ||
      formData.grab !== initialData.grab ||
      JSON.stringify(socialMedia) !== JSON.stringify(initialData.socialMedia)
    );
  };

  // Handle submit form utama
  const onSubmit = async () => {
    if (!hasChanges()) return; // Jangan simpan jika tidak ada perubahan
    await saveWebInfo({ ...formData, socialMedia });
    alert("Data berhasil disimpan!");
    setInitialData({ ...formData, socialMedia }); // Update data awal setelah disimpan
  };

  // Handle tambah media sosial
  const handleAddSocialMedia = async (e) => {
    e.preventDefault();
    if (!newPlatform.trim() || !newUrl.trim()) return;

    const newSocialMediaItem = {
      id: Date.now().toString(),
      platform: newPlatform,
      url: newUrl,
    };
    await addSocialMedia(newSocialMediaItem);
    setSocialMedia((prev) => [...prev, newSocialMediaItem]);
    setNewPlatform("");
    setNewUrl("");
  };

  // Handle hapus media sosial
  const handleRemoveSocialMedia = async (id) => {
    await removeSocialMedia(id);
    setSocialMedia((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-secondary">Tentang Bano</h1>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !hasChanges()} // Nonaktifkan tombol jika form tidak valid atau tidak ada perubahan
          className={`flex items-center px-4 py-2 ${
            isValid && hasChanges() ? "bg-secondary" : "bg-gray-300"
          } text-white rounded-lg hover:bg-secondary/90 cursor-pointer`}
        >
          <Save className="w-5 h-5 mr-2" />
          Simpan Perubahan
        </button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="divide-y divide-gray-200"
        >
          {/* Informasi Kontak */}
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-secondary">
              Informasi Kontak dan Alamat
            </h2>
            <div className="space-y-4">
              {[
                {
                  label: "Nomor WhatsApp",
                  name: "whatsapp",
                  icon: Phone,
                  rules: {
                    required: "Nomor WhatsApp wajib diisi",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Nomor hanya boleh berisi angka",
                    },
                  },
                },
                {
                  label: "Email",
                  name: "email",
                  icon: Mail,
                  rules: {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Masukkan email yang valid",
                    },
                  },
                },
                {
                  label: "Alamat",
                  name: "address",
                  icon: MapPin,
                  rules: {
                    required: "Alamat wajib diisi",
                  },
                },
                {
                  label: "Grab",
                  name: "grab",
                  icon: Car,
                  rules: {
                    required: "Link Grab wajib diisi",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                      message: "Masukkan URL Grab yang valid",
                    },
                  },
                },
              ].map(({ label, name, icon: Icon, rules }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    {label}
                  </label>
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 text-secondary/70 mr-2" />
                    <Controller
                      name={name}
                      control={control}
                      rules={rules}
                      render={({ field, fieldState: { error } }) => (
                        <div className="w-full">
                          <input
                            {...field}
                            type={name === "whatsapp" ? "number" : "text"}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                            placeholder={label}
                          />
                          {error && (
                            <p className="text-red-500 text-sm mt-1">
                              {error.message}
                            </p>
                          )}
                        </div>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
        {/* Media Sosial */}
        <div className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-secondary">
              Media Sosial
            </h2>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("addSocialMediaForm")
                  ?.classList.toggle("hidden")
              }
              className="flex items-center px-3 py-1.5 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90"
            >
              <Plus className="w-4 h-4 mr-1" />
              Tambah Media Sosial
            </button>
          </div>
          {/* Form Tambah Media Sosial */}
          <div
            id="addSocialMediaForm"
            className="hidden space-y-4 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="text-sm font-medium text-secondary">
              Tambah Media Sosial Baru
            </h3>
            <form onSubmit={handleAddSocialMedia} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Contoh: Facebook, Twitter"
                />
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="https://"
                />
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
                  disabled={!newPlatform.trim() || !newUrl.trim()} // Nonaktifkan tombol jika input kosong
                  className={`px-3 py-1.5 ${
                    newPlatform.trim() && newUrl.trim()
                      ? "bg-secondary"
                      : "bg-gray-300"
                  } text-white rounded-lg hover:bg-secondary/90 text-sm cursor-pointer`}
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
          {/* Tabel Media Sosial */}
          <div className="overflow-auto">
            <table className="w-full min-w-[500px]">
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
                    <td className="px-6 py-4">{item.platform}</td>
                    <td className="px-6 py-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary underline"
                      >
                        {item.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-right">
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
      </div>
    </div>
  );
};

export default WebInfo;
