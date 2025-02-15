import { Link } from "react-router-dom";
import { useEffect } from "react";
import { applyThemeFromLocalStorage } from "@/utils/theme";

const ErrorPage = () => {
  useEffect(() => {
    applyThemeFromLocalStorage();
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-light dark:bg-dark">
      <main
        id="content"
        className="text-center py-10 px-4 sm:px-6 lg:px-8 max-w-[50rem] w-full"
      >
        {/* Judul (404) */}
        <h1 className="block text-7xl font-bold text-secondary dark:text-primary sm:text-9xl">
          404
        </h1>

        {/* Deskripsi */}
        <p className="mt-2 text-gray-600 dark:text-neutral-400">
          Halaman yang Anda cari tidak ditemukan.
        </p>

        {/* Tombol Kembali */}
        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <Link
            className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-secondary text-primary hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90 disabled:opacity-50 disabled:pointer-events-none"
            to="/"
          >
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
              <path d="m15 18-6-6 6-6" />
            </svg>
            Kembali
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
