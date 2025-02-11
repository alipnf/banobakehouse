import { NavLink } from "react-router-dom";
import ToggleTheme from "./toggle-theme";
import useAuthStore from "../../store/use-auth-store";
import { handleLogout } from "../../services/firebase/auth-services";

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
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-6xl backdrop-blur-xl bg-opacity-30 w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-semibold dark:text-primary">
            Banobakehouse
          </NavLink>
          <div className="md:hidden flex gap-3">
            <ToggleTheme />
            <button
              type="button"
              className="hs-collapse-toggle size-10 border rounded-full flex items-center justify-center dark:border-neutral-700 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-700"
              data-hs-collapse="#hs-navbar-header-floating"
            >
              <svg
                className="hs-collapse-open:hidden size-3.5"
                xmlns="http://www.w3.org/2000/svg"
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
                className="hs-collapse-open:block hidden size-4"
                xmlns="http://www.w3.org/2000/svg"
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
          className="hidden hs-collapse md:block transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
            {["/", "/product", "/wishlist"].map((path, index) => (
              <NavItem key={index} to={path}>
                {["Beranda", "Produk", "Daftar Favorit"][index]}
              </NavItem>
            ))}
            <div className="hidden md:flex items-center gap-2">
              <ToggleTheme />
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 dark:text-neutral-300">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1.5 text-sm font-medium text-white bg-secondary rounded-lg dark:bg-light dark:text-dark"
                  >
                    Logout
                  </button>
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
