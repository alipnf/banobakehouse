import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "@/hooks/use-auth";
import GoogleIcon from "./google-icon";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const {
    isLoading,
    authError,
    handleEmailRegister,
    handleGoogleSignIn,

    isGoogleLoading,
  } = useAuth();

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return; // Error ini ditangani oleh react-hook-form
    }
    handleEmailRegister(data.email, data.password, data.username);
  };

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 max-w-sm md:max-w-lg mx-auto">
      <div className="p-4 sm:p-7">
        {/* Header */}
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
            Daftar
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            Sudah punya akun?{" "}
            <Link
              className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              to="/auth/login"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

        {/* Tombol Google Register */}
        <div className="mt-5">
          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div
                className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-dark rounded-full dark:text-light"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <GoogleIcon />
                Daftar dengan Google
              </>
            )}
          </button>
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500">
            Atau
          </div>
        </div>

        {/* Formulir Pendaftaran */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm mb-2 dark:text-white"
            >
              Nama Pengguna
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "Nama pengguna wajib diisi",
                minLength: { value: 3, message: "Minimal 3 karakter" },
              })}
              className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
            {errors.username && (
              <p className="text-xs text-red-600 mt-2">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2 dark:text-white"
            >
              Alamat Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Format email tidak valid",
                },
              })}
              className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm mb-2 dark:text-white"
            >
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: { value: 8, message: "Minimal 8 karakter" },
              })}
              className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm mb-2 dark:text-white"
            >
              Konfirmasi Kata Sandi
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Konfirmasi password wajib diisi",
                validate: (value) =>
                  value === password || "Password tidak cocok",
              })}
              className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:placeholder-neutral-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Tampilkan pesan error global */}
          {authError && (
            <p className="text-xs text-red-600 mt-2">{authError}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-secondary text-white hover:bg-dark focus:outline-none dark:bg-light dark:text-dark"
            >
              {isLoading ? (
                <div
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Daftar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
