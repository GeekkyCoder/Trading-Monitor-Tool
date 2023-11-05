import Auth from "./src/pages/Auth/Auth";
import Content from "./src/pages/Content";
import Dashbaord from "./src/pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import UnAuthorized from "./src/pages/UnAuthorized";
import RequireAuth from "./src/components/RequireAuth/RequireAuth";
import TradeManagement from "./src/pages/TradeManagement";
import Reoprts from "./src/pages/Reoprts";
import { ThemeProvider } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./src/context/themeContext/theme.context";

function App() {

  const {theme} = useContext(ThemeContext)

  return (
    <>
      <ThemeProvider theme={theme} >
      <Routes>
        <Route path="/auth" element={<Auth />} />

        <Route path="/authentication/unauthorized" element={<UnAuthorized />} />

        <Route element={<RequireAuth allowedRole={"management"} />}>
          <Route path="/" element={<Dashbaord />}>
            <Route index element={<Content />} />
            <Route path="/trade-management" element={<TradeManagement />} />
            <Route path="/reports" element={<Reoprts />} />
          </Route>
        </Route>
      </Routes>
        </ThemeProvider>
    </>
  );
}

export default App;
