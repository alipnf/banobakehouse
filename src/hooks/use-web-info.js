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
  const [initialData, setInitialData] = useState(null);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWebInfo();
      if (data) {
        const initialFormData = {
          whatsapp: data.whatsapp || "",
          email: data.email || "",
          address: data.address || "",
        };
        reset(initialFormData);
        setInitialData(initialFormData);
        setSocialMedia(data.socialMedia || []);
      }
    };
    fetchData();
  }, [reset]);

  const formData = watch();

  const hasChanges = () => {
    if (!initialData) return false;
    return (
      formData.whatsapp !== initialData.whatsapp ||
      formData.email !== initialData.email ||
      formData.address !== initialData.address ||
      JSON.stringify(socialMedia) !== JSON.stringify(initialData.socialMedia)
    );
  };

  const onSubmit = async () => {
    if (!hasChanges()) return;
    await saveWebInfo({ ...formData, socialMedia });
    alert("Data berhasil disimpan!");
    setInitialData({ ...formData, socialMedia });
  };

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

  const handleRemoveSocialMedia = async (id) => {
    await removeSocialMedia(id);
    setSocialMedia((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    control,
    handleSubmit,
    isValid,
    hasChanges,
    onSubmit,
    socialMedia,
    newPlatform,
    setNewPlatform,
    newUrl,
    setNewUrl,
    handleAddSocialMedia,
    handleRemoveSocialMedia,
  };
};

export default useWebInfo;
