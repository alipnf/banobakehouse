import { Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/quest";
import GuestLayout from "@/layouts/guest-layout";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/use-auth-store";

const GuestRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const GuestRoutes = () => {
  return (
    <Route
      path="auth"
      element={
        <GuestRoute>
          <GuestLayout />
        </GuestRoute>
      }
    >
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
};

export default GuestRoutes;
