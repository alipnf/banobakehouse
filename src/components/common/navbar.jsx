import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-6xl backdrop-blur-xl bg-opacity-30 w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 dark:text-neutral-400 "
              aria-label="Brand"
            >
              Banobakehouse
            </NavLink>
          </div>

          <div className="md:hidden">
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${
                  isActive
                    ? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
                    : "border-transparent text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                } focus:outline-none`
              }
              aria-current="page"
            >
              Beranda
            </NavLink>
            <NavLink
              to="/produk"
              className={({ isActive }) =>
                `py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${
                  isActive
                    ? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
                    : "border-transparent text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                } focus:outline-none`
              }
            >
              Produk
            </NavLink>
            <NavLink
              to="/rekomendasi"
              className={({ isActive }) =>
                `py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${
                  isActive
                    ? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
                    : "border-transparent text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                } focus:outline-none`
              }
            >
              Rekomendasi
            </NavLink>
            <NavLink
              to="/keranjang"
              className={({ isActive }) =>
                `py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 ${
                  isActive
                    ? "border-gray-800 font-medium text-gray-800 dark:border-neutral-200 dark:text-neutral-200"
                    : "border-transparent text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                } focus:outline-none`
              }
            >
              <ShoppingCart className="size-4 text-gray-600 dark:text-neutral-400" />
            </NavLink>
            <>
              <button
                type="button"
                className="hs-dark-mode-active:hidden block hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                data-hs-theme-click-value="dark"
              >
                <span className="group inline-flex shrink-0 justify-center items-center size-9">
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
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </svg>
                </span>
              </button>
              <button
                type="button"
                className="hs-dark-mode-active:block hidden hs-dark-mode font-medium text-gray-800 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                data-hs-theme-click-value="light"
              >
                <span className="group inline-flex shrink-0 justify-center items-center size-9">
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
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                </span>
              </button>
            </>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
