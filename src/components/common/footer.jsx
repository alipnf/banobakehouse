import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { getWebInfo } from "@/services/firebase/about-service";

const Footer = () => {
  const [webInfo, setWebInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light dark:bg-dark mt-16 max-w-7xl mx-auto px-4">
      <div className="mx-auto py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
              BanoBakehouse
            </h2>
            <p className="mt-3 text-gray-500 dark:text-neutral-400 text-sm lg:w-2/3">
              BanoBakehouse adalah toko kue premium yang menyediakan berbagai
              pilihan kue berkualitas untuk setiap momen spesial Anda.
            </p>
          </div>
          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200 uppercase">
              Kontak
            </h3>
            <ul className="mt-3 space-y-2 text-gray-500 dark:text-neutral-400 text-sm">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3" />
                {loading
                  ? "Loading..."
                  : webInfo?.address || "Alamat tidak tersedia"}
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" />
                {loading
                  ? "Loading..."
                  : webInfo?.whatsapp || "Nomor tidak tersedia"}
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" />
                {loading
                  ? "Loading..."
                  : webInfo?.email || "Email tidak tersedia"}
              </li>
            </ul>
          </div>
          {/* Social Media Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200 uppercase">
              Sosial Media
            </h3>
            <div className="mt-3 flex flex-wrap gap-4 text-gray-500 dark:text-neutral-400 text-sm">
              {loading ? (
                <span>Loading...</span>
              ) : webInfo?.socialMedia?.length > 0 ? (
                webInfo.socialMedia.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-800 dark:hover:text-neutral-200 transition-colors"
                  >
                    {item.platform}
                  </a>
                ))
              ) : (
                <span>Media sosial tidak tersedia</span>
              )}
            </div>
          </div>
        </div>
        {/* Copyright Section */}
        <div className="mt-6 sm:mt-8 border-t border-gray-200 dark:border-neutral-700 pt-6 sm:pt-8">
          <p className="text-center text-gray-500 dark:text-neutral-400 text-sm">
            © {currentYear} BanoBakehouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
