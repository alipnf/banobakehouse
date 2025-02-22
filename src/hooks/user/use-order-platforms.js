import { useEffect, useState } from "react";
import { getWebInfo } from "@/services/supabase/about-service";
import { toast } from "react-toastify";
import useWebInfoStore from "@/store/use-web-info-store";

const useOrderPlatforms = () => {
  const { webInfo, setWebInfo } = useWebInfoStore();
  const [loading, setLoading] = useState(true);

  // Fetch data dari Firebase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWebInfo();
        if (data) {
          setWebInfo(data);
        }
      } catch (error) {
        console.error("Error fetching web info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setWebInfo]);

  // Fungsi untuk membuka WhatsApp
  const openWhatsApp = () => {
    if (webInfo && webInfo.whatsapp) {
      const message = encodeURIComponent("Aku ingin pesan kue");
      window.open(
        `https://wa.me/${webInfo.whatsapp}?text=${message}`,
        "_blank",
      );
    } else {
      toast.error("Nomor WhatsApp tidak tersedia.", {
        position: "top-right",
      });
    }
  };

  // Fungsi untuk membuka Grab
  const openGrab = () => {
    if (webInfo && webInfo.grab) {
      window.open(webInfo.grab, "_blank");
    } else {
      toast.error("Link Grab tidak tersedia.", {
        position: "top-right",
      });
    }
  };

  return { loading, openWhatsApp, openGrab, webInfo };
};

export default useOrderPlatforms;
