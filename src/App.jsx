import { BrowserRouter } from "react-router-dom";
import UserRoutes from "./routes/user-routes";

const App = () => {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
};

export default App;
