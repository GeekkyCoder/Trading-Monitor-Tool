import { createTheme, alpha } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { createContext, useState, useCallback } from "react";

import { useTheme } from "@mui/material";

const violetBaseLight = "#263238";
const voiletBaseDark = "#263238";
const violetMainLight = alpha(violetBaseLight, 0.9);
const voiletMainDark = alpha(voiletBaseDark, 0.9);

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const modeTheme = useTheme();

  const GenerateTheme = useCallback(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              // palette values for light mode
              primary: {
                main: violetMainLight,
              },
              background: {
                paper: "#fff",
              },
              text: {
                primary: blueGrey["A700"],
              },
              action: {
                disabled: "#fff",
                disabledBackground: grey["A700"],
              },
            }
          : {
              // palette values for dark mode
              primary: {
                main: voiletMainDark,
              },
              background: {
                paper: "#ffffff",
              },
              text: {
                primary: blueGrey["A700"],
                secondary: "#fff",
              },
              action: {
                disabled: "#000",
                disabledBackground: grey["A700"],
              },
            }),
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "& label.Mui-focused": {
                color: "#A0AAB4",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#B2BAC2",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#E0E3E7",
                },
                "&:hover fieldset": {
                  borderColor: "#B2BAC2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6F7E8C",
                },
                "&.Mui-disabled fieldset": {
                  borderColor: "#6F7E8C",
                },
              },
            },
          },
        },
        // MuiCssBaseline: {
        //   styleOverrides: {
        //     body: {
        //       "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
        //         width: "12px",
        //       },
        //       " & *::-webkit-scrollbar-thumb": {
        //         borderRadius: "25px",
        //         backgroundColor: `${modeTheme?.palette?.background.paper}`,
        //         minHeight: 24,
        //       },
        //     },
        //   },
        // },
        MuiAutocomplete: {
          styleOverrides: {
            root: {
              "& .Mui-focused": {
                color: "#A0AAB4",
              },
            },
          },
        },
      },
    });
  }, [mode]);

  const theme = GenerateTheme();

  const value = {
    theme,
    mode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
