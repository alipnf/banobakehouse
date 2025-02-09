import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/user-routes";
import QuestRoutes from "./routes/quest-routes";

const App = () => {
  return (
    <BrowserRouter>
      <UserRoutes />
      <QuestRoutes />
    </BrowserRouter>
  );
};

export default App;
