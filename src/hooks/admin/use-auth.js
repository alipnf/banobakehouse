import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  serviceGoogleLogin,
  serviceEmailLogin,
  serviceEmailRegister,
} from "@/services/supabase/auth-service";
import useAuthStore from "@/store/use-auth-store";

const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const { setUser } = useAuthStore();

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "Invalid login credentials":
        return "Username atau Password salah.";
      case "too_many_requests":
        return "Terlalu banyak percobaan gagal. Coba lagi nanti.";
      case "User already registered":
        return "Email sudah digunakan.";
      case "password_too_weak":
        return "Password terlalu lemah. Gunakan minimal 8 karakter.";
      default:
        return "Gagal masuk/mendaftar. Silakan coba lagi.";
    }
  };

  const handleEmailPasswordLogin = async (email, password) => {
    setIsLoading(true);
    setAuthError("");
    try {
      const user = await serviceEmailLogin(email, password);
      setUser(user);
      toast.success("Login berhasil!");
      if (user.role === "admin") {
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      setAuthError(getErrorMessage(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const data = await serviceGoogleLogin();
      console.log(data);
    } catch (error) {
      setAuthError(getErrorMessage(error.message));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleEmailRegister = async (email, password, username) => {
    setIsLoading(true);
    setAuthError("");
    try {
      await serviceEmailRegister(email, password, username);
      toast.success("Registrasi berhasil!");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (error) {
      setAuthError(getErrorMessage(error.message));
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
