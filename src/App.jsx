import { BrowserRouter, Routes } from "react-router-dom";
import UserRoutes from "./routes/user-routes";
import QuestRoutes from "./routes/quest-routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {UserRoutes()}
        {QuestRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
