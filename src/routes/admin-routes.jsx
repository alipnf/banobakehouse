import { Route } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import AdminLayout from "@/layouts/admin-layout";
import {
  AboutUsPage,
  FaqPage,
  CategoriesPage,
  ProductsPage,
} from "@/pages/admin";

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
      <Route path="faq" element={<FaqPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="products" element={<ProductsPage />} />
    </Route>
  );
};

export default AdminRoutes;
