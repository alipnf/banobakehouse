import { BrowserRouter, Routes } from "react-router-dom";
import UserRoutes from "./routes/user-routes";
import QuestRoutes from "./routes/quest-routes";
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
