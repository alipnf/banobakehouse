import { Routes, Route } from "react-router-dom";
import QuestLayout from "../layouts/quest-layout";
import { LoginPage, RegisterPage } from "../pages/quest";

const QuestRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<QuestLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default QuestRoutes;
