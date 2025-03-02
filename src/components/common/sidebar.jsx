import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  Grid,
  HelpCircle,
  MessageCircle,
  LogOut,
} from "lucide-react";
import useAuthStore from "@/store/use-auth-store";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate("/");
    await signOut();
  };

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
          {/* Logout Button */}
          <div className="mt-auto p-3">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center gap-x-3 py-2 px-3 text-base rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400 w-full transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Content Wrapper */}
      <div className="w-full pt-12 px-4 sm:px-6 md:px-8 lg:pl-72">
        {children}
      </div>

      {/* Logout Modal */}
      <Dialog
        open={isLogoutModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-neutral-800 p-6 duration-300 ease-out shadow-2xl">
              <DialogTitle
                as="h3"
                className="text-base font-medium text-dark dark:text-light"
              >
                Logout
              </DialogTitle>
              <p className="mt-2 text-sm text-gray-700 dark:text-neutral-300">
                Apakah Anda yakin ingin keluar dari akun ini?
              </p>
              <div className="mt-4 flex gap-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 dark:bg-gray-600 py-1.5 px-3 text-sm font-semibold text-white dark:text-light shadow-inner focus:outline-none hover:bg-gray-600 dark:hover:bg-gray-500"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-700 dark:bg-red-600 py-1.5 px-3 text-sm font-semibold text-white dark:text-light shadow-inner focus:outline-none hover:bg-red-600 dark:hover:bg-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Sidebar;
