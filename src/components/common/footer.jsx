import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-neutral-900 mt-16">
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
                <MapPin className="h-5 w-5 mr-3" /> Jl. Cake Street No. 123,
                Jakarta
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3" /> +62 123 456 789
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3" /> info@banobakehouse.com
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200 uppercase">
              Sosial Media
            </h3>
            <ul className="mt-3 space-y-2 text-gray-500 dark:text-neutral-400 text-sm">
              <li>
                <a
                  href="https://instagram.com"
                  className="hover:text-gray-800 dark:hover:text-neutral-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  className="hover:text-gray-800 dark:hover:text-neutral-200"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  className="hover:text-gray-800 dark:hover:text-neutral-200"
                >
                  Twitter
                </a>
              </li>
            </ul>
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
