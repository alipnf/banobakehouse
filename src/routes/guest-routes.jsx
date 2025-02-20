import { Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/quest";
import GuestLayout from "@/layouts/guest-layout";

const GuestRoutes = () => {
  return (
    <Route path="auth" element={<GuestLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
};

export default GuestRoutes;
