import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Grid, HelpCircle, MessageCircle } from "lucide-react";
import ToggleTheme from "./toggle-theme";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar Top (Mobile) */}
      <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center py-2">
          <button
            type="button"
            className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
              <path d="m8 9 3 3-3 3" />
            </svg>
          </button>
          <span className="ms-3 text-sm font-semibold text-gray-800 dark:text-neutral-400">
            Dashboard
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 start-0 z-50 w-[260px] h-full bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block`}
      >
        <div className="relative flex flex-col h-full max-h-full">
          {/* Close Button (Mobile) */}
          <div className="flex justify-end p-2 lg:hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-gray-800 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pt-4 flex items-center justify-center gap-2">
            <NavLink
              to="/admin"
              className="text-xl font-semibold dark:text-primary"
            >
              Banobakehouse
            </NavLink>

            <ToggleTheme />
          </div>

          {/* Sidebar Links */}
          <nav className="p-3">
            <ul className="flex flex-col space-y-1">
              <li>
                <NavLink
                  to="/admin/about-us"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                      isActive
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                        : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={16} />
                  Tentang Bano
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                      isActive
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                        : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Package size={16} />
                  Produk
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/categories"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                      isActive
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                        : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Grid size={16} />
                  Kategori
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/faq"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                      isActive
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                        : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <HelpCircle size={16} />
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/testimonials"
                  className={({ isActive }) =>
                    `flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg ${
                      isActive
                        ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                        : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle size={16} />
                  Testimoni
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        {children}
      </div>
    </>
  );
};

export default Sidebar;
