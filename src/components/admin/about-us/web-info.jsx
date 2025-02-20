import { Controller } from "react-hook-form";
import { Save, Phone, Mail, MapPin, Plus, Trash2, Car } from "lucide-react";
import useWebInfo from "@/hooks/admin/use-web-info";

const WebInfo = () => {
  const [
    handleSubmit,
    control,
    isValid,
    socialMedia,
    setNewPlatform,
    setNewUrl,
    handleAddSocialMedia,
    handleRemoveSocialMedia,
    onSubmit,
    hasChanges,
    newUrl,
    newPlatform,
  ] = useWebInfo();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-secondary">Tentang Bano</h1>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || !hasChanges()}
          className={`flex items-center px-4 py-2 ${
            isValid && hasChanges() ? "bg-secondary" : "bg-gray-300"
          } text-white rounded-lg cursor-pointer`}
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
                  label: "Nomor WhatsApp (awalan 62)",
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
                  value={newPlatform || ""}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                  placeholder="Contoh: Facebook, Twitter"
                />
                <input
                  type="url"
                  value={newUrl || ""}
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
                  disabled={!newPlatform.trim() || !newUrl.trim()}
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
