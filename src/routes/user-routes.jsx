import { Route } from "react-router-dom";
import UserLayout from "@/layouts/user-layout";
import {
  HomePage,
  ProductPage,
  ProductDetailPage,
  WishlistPage,
} from "../pages/user";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/use-auth-store";

const AuthRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const UserRoutes = () => {
  return (
    <Route path="/" element={<UserLayout />}>
      <Route index element={<HomePage />} />
      <Route path="product" element={<ProductPage />} />
      <Route path="product/:id" element={<ProductDetailPage />} />
      <Route
        path="wishlist"
        element={
          <AuthRoute>
            <WishlistPage />
          </AuthRoute>
        }
      />
    </Route>
  );
};

export default UserRoutes;
