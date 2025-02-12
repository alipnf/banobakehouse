import { Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import AdminLayout from "../layouts/admin-layout";
import Dashboard from "../pages/admin/dashboard";

const AdminRoutes = () => {
  return (
    <Route
      path="dashboard"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
    </Route>
  );
};

export default AdminRoutes;
