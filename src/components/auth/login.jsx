import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  handleGoogleLogin,
  handleEmailLogin,
} from "../../services/firebase/auth-services";
import useAuthStore from "../../store/use-auth-store";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fungsi untuk menangani login email/password
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const user = await handleEmailLogin(data.email, data.password);
      const { email, role, name } = user;

      toast.success("Login berhasil!");

      setUser({ email, role, name });

      // Redirect berdasarkan role
      if (role === "admin") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menangani login Google
  const onGoogleLogin = async () => {
    setIsLoading(true); // Aktifkan loading state
    try {
      const user = await handleGoogleLogin();
      const { email, role, name } = user;

      // Tampilkan notifikasi sukses
      toast.success("Login dengan Google berhasil!");

      // Simpan data pengguna ke store
      setUser({ email, role, name });

      // Redirect berdasarkan role
      if (role === "admin") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Nonaktifkan loading state
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Komponen Utama */}
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 max-w-sm md:max-w-lg mx-auto">
        <div className="p-4 sm:p-7">
          {/* Header */}
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Masuk
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Belum punya akun?{" "}
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                to="/auth/register"
              >
                Daftar di sini
              </Link>
            </p>
          </div>

          {/* Tombol Google Login */}
          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              onClick={onGoogleLogin}
              disabled={isLoading} // Nonaktifkan tombol saat loading
            >
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                {/* Google SVG */}
              </svg>
              Masuk dengan Google
            </button>
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500">
              Atau
            </div>
          </div>

          {/* Formulir Login */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
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
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:focus:ring-neutral-600"
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
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary dark:bg-neutral-900 dark:border-neutral-500 dark:text-neutral-400 dark:focus:ring-neutral-600"
                />
                {errors.password && (
                  <p className="text-xs text-red-600 mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading} // Nonaktifkan tombol saat loading
                className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-secondary text-white hover:bg-dark focus:outline-none dark:bg-light dark:text-dark"
              >
                {isLoading ? (
                  <div
                    className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-light rounded-full dark:text-light"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Masuk"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
