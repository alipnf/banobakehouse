import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  serviceGoogleLogin,
  serviceEmailLogin,
  serviceEmailRegister,
} from "@/services/firebase/auth-services";
import useAuthStore from "@/store/use-auth-store";

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const { setUser } = useAuthStore();

  // Fungsi untuk mendapatkan pesan error berdasarkan Firebase error code
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Username atau Password salah.";
      case "auth/too-many-requests":
        return "Terlalu banyak percobaan gagal. Coba lagi nanti.";
      case "auth/email-already-in-use":
        return "Email sudah digunakan.";
      case "auth/weak-password":
        return "Password terlalu lemah. Gunakan minimal 8 karakter.";
      default:
        return "Gagal masuk/mendaftar. Silakan coba lagi.";
    }
  };

  // Fungsi untuk menangani login email/password
  const handleEmailPasswordLogin = async (email, password) => {
    setIsLoading(true);
    setAuthError(""); // Reset pesan error sebelum mencoba login
    try {
      const user = await serviceEmailLogin(email, password);
      const { id, email: userEmail, role, name } = user;
      setUser({ id, email: userEmail, role, name });
      toast.success("Login berhasil!");
      // Redirect berdasarkan role
      if (role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setAuthError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk menangani login Google
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const user = await serviceGoogleLogin();
      console.log("User:", user);
      const { id, email, role, name } = user;
      setUser({ id, email, role, name });
      toast.success("Login berhasil!");
      // Redirect berdasarkan role
      if (role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.code, error.message);
      setAuthError(getErrorMessage(error.code));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Fungsi untuk menangani registrasi email/password
  const handleEmailRegister = async (email, password, username) => {
    setIsLoading(true);
    setAuthError(""); // Reset pesan error sebelum mencoba registrasi
    try {
      await serviceEmailRegister(email, password, username);
      toast.success("Registrasi berhasil!");
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      console.error(error.code, error.message);
      setAuthError(getErrorMessage(error.code));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isGoogleLoading,
    authError,
    handleEmailPasswordLogin,
    handleGoogleSignIn,
    handleEmailRegister,
  };
};

export default useAuth;
