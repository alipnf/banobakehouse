import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getWebInfo,
  saveWebInfo,
  addSocialMedia,
  removeSocialMedia,
} from "@/services/firebase/about-service";

const useWebInfo = () => {
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

  return [
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
  ];
};

export default useWebInfo;
