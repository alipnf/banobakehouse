import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getWebInfo,
  saveWebInfo,
  addSocialMedia,
  removeSocialMedia,
} from "@/services/supabase/about-service";

const useWebInfo = () => {
  const [socialMedia, setSocialMedia] = useState([]);
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [initialData, setInitialData] = useState(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWebInfo();
        if (data) {
          const initialFormData = {
            whatsapp: data.whatsapp || "",
            email: data.email || "",
            address: data.address || "",
            grab: data.grab || "",
          };
          reset(initialFormData);
          setInitialData({
            ...initialFormData,
            socialMedia: data.social_media || [],
          });
          setSocialMedia(data.social_media || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error.message);
      }
    };
    fetchData();
  }, [reset]);

  const formData = watch();

  const hasChanges = () => {
    if (!initialData) return false;

    const isFormChanged =
      formData.whatsapp !== initialData.whatsapp ||
      formData.email !== initialData.email ||
      formData.address !== initialData.address ||
      formData.grab !== initialData.grab;

    const isSocialMediaChanged = !arraysEqual(
      socialMedia,
      initialData.socialMedia,
    );

    return isFormChanged || isSocialMediaChanged;
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((item, index) =>
      Object.keys(item).every((key) => item[key] === arr2[index][key]),
    );
  };

  const onSubmit = async () => {
    if (!hasChanges()) return;
    try {
      await saveWebInfo({ ...formData, social_media: socialMedia });
      alert("Data berhasil disimpan!");
      setInitialData({ ...formData, socialMedia });
    } catch (error) {
      console.error("Gagal menyimpan data:", error.message);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const handleAddSocialMedia = async (e) => {
    e.preventDefault();
    if (!newPlatform.trim() || !newUrl.trim()) return;

    const isDuplicate = socialMedia.some(
      (item) => item.platform === newPlatform && item.url === newUrl,
    );
    if (isDuplicate) {
      alert("Media sosial sudah ada.");
      return;
    }

    const newSocialMediaItem = {
      id: Date.now().toString(),
      platform: newPlatform,
      url: newUrl,
    };

    try {
      await addSocialMedia(newSocialMediaItem);
      setSocialMedia((prev) => [...prev, newSocialMediaItem]);
      setNewPlatform("");
      setNewUrl("");
    } catch (error) {
      console.error("Gagal menambahkan media sosial:", error.message);
      alert("Gagal menambahkan media sosial. Silakan coba lagi.");
    }
  };

  const handleRemoveSocialMedia = async (id) => {
    try {
      await removeSocialMedia(id);
      setSocialMedia((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus media sosial:", error.message);
      alert("Gagal menghapus media sosial. Silakan coba lagi.");
    }
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
