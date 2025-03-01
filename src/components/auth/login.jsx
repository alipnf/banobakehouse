import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/user/use-auth";
// import GoogleIcon from "./google-icon";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Gunakan custom hook untuk logika autentikasi
  const { isLoading, isGoogleLoading, authError, handleEmailPasswordLogin } =
    useAuth();

  // Fungsi onSubmit untuk login email/password
  const onSubmit = (data) => {
    handleEmailPasswordLogin(data.email, data.password);
  };

  // Fungsi untuk login Google
  // const onGoogleLogin = () => {
  //   handleGoogleSignIn();
  // };

  return (
    <div className="mx-5">
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
          {/* <div className="mt-5"> */}
          {/*   <button */}
          {/*     type="button" */}
          {/*     className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" */}
          {/*     onClick={onGoogleLogin} */}
          {/*     disabled={isLoading || isGoogleLoading} */}
          {/*   > */}
          {/*     {isGoogleLoading ? ( */}
          {/*       <div */}
          {/*         className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-dark rounded-full dark:text-light" */}
          {/*         role="status" */}
          {/*         aria-label="loading" */}
          {/*       > */}
          {/*         <span className="sr-only">Loading...</span> */}
          {/*       </div> */}
          {/*     ) : ( */}
          {/*       <> */}
          {/*         <GoogleIcon /> */}
          {/*         Masuk dengan Google */}
          {/*       </> */}
          {/*     )} */}
          {/*   </button> */}
          {/*   <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500"> */}
          {/*     Atau */}
          {/*   </div> */}
          {/* </div> */}

          {/* Formulir Login */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4 mt-5">
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

              {/* Tampilkan pesan error autentikasi */}
              {authError && (
                <p className="text-xs text-red-600 mt-2">{authError}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full py-3 px-4 text-sm font-medium rounded-lg bg-secondary text-white hover:bg-dark focus:outline-none dark:bg-light dark:text-dark"
              >
                {isLoading ? (
                  <div
                    className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-light rounded-full dark:text-dark"
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
    </div>
  );
};

export default Login;
