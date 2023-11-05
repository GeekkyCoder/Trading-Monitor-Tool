import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.js";

import { client, QueryClientProvider } from "./utils/utils.js";
import { AuthContextProvider } from "./components/context/authContext.jsx";
import { ThemeContextProvider } from "./context/themeContext/theme.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ThemeContextProvider>
        <AuthContextProvider>
          <QueryClientProvider client={client}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
