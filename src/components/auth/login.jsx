import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  handleGoogleLogin,
  handleEmailLogin,
} from "../../services/firebase/auth-services";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const role = await handleEmailLogin(data.email, data.password);
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const onGoogleLogin = async () => {
    const role = await handleGoogleLogin();
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 max-w-sm mx-auto">
      <div className="p-4 sm:p-7">
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

        <div className="mt-5">
          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            onClick={onGoogleLogin}
          >
            <svg
              className="w-4 h-auto"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Masuk dengan Google
          </button>

          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500">
            Atau
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
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

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-secondary text-white hover:bg-dark focus:outline-none dark:bg-light dark:text-dark"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
