import { Route } from "react-router-dom";
import AdminLayout from "../layouts/admin-layout";
import Dashboard from "../pages/admin/dashboard";

const AdminRoutes = () => {
  return (
    <Route path="dashboard" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
  );
};

export default AdminRoutes;
