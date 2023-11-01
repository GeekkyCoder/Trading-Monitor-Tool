import Auth from "./src/pages/Auth/Auth";
import Content from "./src/pages/Content";
import Dashbaord from "./src/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import UnAuthorized from "./src/pages/UnAuthorized";
import RequireAuth from "./src/components/RequireAuth/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route path="/authentication/unauthorized" element={<UnAuthorized />} />

        <Route element={<RequireAuth allowedRole={"management"} />}>
          <Route path="/" element={<Dashbaord />}>
            <Route index element={<Content />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
