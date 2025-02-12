import { BrowserRouter, Routes } from "react-router-dom";
import { AdminRoutes, QuestRoutes, UserRoutes } from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
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

      <Routes>
        {UserRoutes()}
        {QuestRoutes()}
        {AdminRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
