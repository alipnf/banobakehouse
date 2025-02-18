import { useEffect, useState } from "react";
import { getWebInfo } from "@/services/supabase/about-service";
import { toast } from "react-toastify";

const OrderPlatforms = () => {
  const [webInfo, setWebInfo] = useState(null);
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
  }, []);

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

  return (
    <section className="bg-light dark:bg-dark mt-10 pt-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold dark:text-primary text-secondary sm:text-4xl">
            Pemesanan
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-300">
            Pesan Melalui WhatsApp atau Order Lewat GoFood
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center space-x-6">
          {/* Tombol WhatsApp */}
          <button
            onClick={openWhatsApp}
            className="py-3 px-5 text-sm sm:text-base font-medium rounded-lg bg-secondary text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 dark:bg-light dark:text-dark"
            disabled={loading || !webInfo?.whatsapp}
          >
            {loading ? "Loading..." : "WhatsApp"}
          </button>

          {/* Tombol Grab */}
          <button
            onClick={openGrab}
            className="py-3 px-5 text-sm sm:text-base font-medium rounded-lg bg-secondary text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 dark:bg-light dark:text-dark"
            disabled={loading || !webInfo?.grab}
          >
            {loading ? "Loading..." : "Grab"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default OrderPlatforms;
