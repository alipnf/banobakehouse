import { NavLink } from "react-router-dom";
import ToggleTheme from "./toggle-theme";
import useAuthStore from "../../store/use-auth-store";
import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${
        isActive
          ? "border-gray-800 font-medium text-dark dark:border-light dark:text-light"
          : "border-transparent text-secondary hover:text-dark dark:text-neutral-400 dark:hover:text-light"
      } focus:outline-none`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-6xl backdrop-blur-xl bg-opacity-30 w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-semibold dark:text-primary">
            Banobakehouse
          </NavLink>
          <div className="md:hidden flex justify-center items-center gap-3">
            <ToggleTheme />

            <button
              type="button"
              className="hs-collapse-toggle flex justify-center items-center size-10 border border-gray-200 text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              id="hs-navbar-header-floating-collapse"
              aria-expanded="false"
              aria-controls="hs-navbar-header-floating"
              aria-label="Toggle navigation"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <svg
                className="hs-collapse-open:hidden shrink-0 size-3.5"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden shrink-0 size-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="hs-navbar-header-floating"
          className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block"
          aria-labelledby="hs-navbar-header-floating-collapse"
        >
          {" "}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
            {["/", "/product", "/wishlist"].map((path, index) => (
              <NavItem key={index} to={path}>
                {["Beranda", "Produk", "Daftar Favorit"][index]}
              </NavItem>
            ))}
            <div className="hidden md:flex items-center gap-2">
              <ToggleTheme />
            </div>
            <div className="flex items-center justify-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 dark:text-neutral-300 cursor-pointer">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="px-4 py-1.5 text-sm font-medium text-white bg-secondary rounded-lg dark:bg-light dark:text-dark"
                  >
                    Logout
                  </button>
                  {/* Logout Modal */}
                  <Dialog
                    open={isLogoutModalOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={() => setIsLogoutModalOpen(false)}
                    __demoMode
                  >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                          transition
                          className="w-full max-w-md rounded-xl bg-white dark:bg-neutral-800 p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-2xl"
                        >
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
                              onClick={signOut}
                            >
                              Logout
                            </Button>
                          </div>
                        </DialogPanel>
                      </div>
                    </div>
                  </Dialog>
                </div>
              ) : (
                [
                  {
                    to: "/auth/login",
                    text: "Masuk",
                    styles:
                      "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700",
                  },
                  {
                    to: "/auth/register",
                    text: "Daftar",
                    styles:
                      "text-white bg-secondary dark:bg-light dark:text-dark",
                  },
                ].map(({ to, text, styles }, index) => (
                  <NavLink
                    key={index}
                    to={to}
                    className={`px-4 py-1.5 text-sm font-medium rounded-lg ${styles}`}
                  >
                    {text}
                  </NavLink>
                ))
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
