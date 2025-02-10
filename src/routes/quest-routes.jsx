import { Route } from "react-router-dom";
import QuestLayout from "../layouts/quest-layout";
import { LoginPage, RegisterPage } from "../pages/quest";

const QuestRoutes = () => {
  return (
    <Route path="auth" element={<QuestLayout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  );
};

export default QuestRoutes;
