import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Grid, HelpCircle, MessageCircle } from "lucide-react";
import ToggleTheme from "./toggle-theme";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navbar Top (Mobile) */}
      <div className="sticky top-0 inset-x-0 z-50 bg-white border-b px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div className="flex items-center py-3">
          <button
            type="button"
            className="size-10 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              className="shrink-0 size-5"
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
          <span className="ms-3 text-base font-semibold text-gray-800 dark:text-neutral-400">
            Dashboard
          </span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[260px] h-full bg-white border-r border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 transition-transform duration-300 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } lg:translate-x-0 lg:opacity-100 lg:block`}
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

          {/* Header */}
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
              {[
                { to: "/admin/about-us", icon: Home, label: "Tentang Bano" },
                { to: "/admin/products", icon: Package, label: "Produk" },
                { to: "/admin/categories", icon: Grid, label: "Kategori" },
                { to: "/admin/faq", icon: HelpCircle, label: "FAQ" },
                {
                  to: "/admin/testimonials",
                  icon: MessageCircle,
                  label: "Testimoni",
                },
              ].map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-x-3 py-2 px-3 text-base rounded-lg transition ${
                        isActive
                          ? "bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white"
                          : "text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="w-full pt-12 px-4 sm:px-6 md:px-8 lg:pl-72">
        {children}
      </div>
    </>
  );
};

export default Sidebar;
