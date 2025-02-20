import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminRoutes, GuestRoutes, UserRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import ErrorPage from "./pages/error/error-page";
import { useEffect } from "react";
import { applyThemeFromLocalStorage } from "./utils/theme";
import ScrollToTop from "./utils/ScrollToTop";

const App = () => {
  useEffect(() => {
    applyThemeFromLocalStorage();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ScrollToTop />

      <Routes>
        {UserRoutes()}
        {GuestRoutes()}
        {AdminRoutes()}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
