import { Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import AdminLayout from "@/layouts/admin-layout";
import AboutUsPage from "@/pages/admin/about-us-page";

const AdminRoutes = () => {
  return (
    <Route
      path="admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<AboutUsPage />} />
      <Route path="about-us" element={<AboutUsPage />} />
    </Route>
  );
};

export default AdminRoutes;
