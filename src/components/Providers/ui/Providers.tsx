"use client";

import { Header } from "@/components/Header";
import { TTheme } from "@/lib/types/types";

import { Box, createTheme, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<TTheme>("light");

  const themeConf = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: ["Roboto"].join(","),
        },
        palette: {
          mode: themeMode,
          // You can further customize colors based on mode here
        },
      }),
    [themeMode]
  );
  return (
    <ThemeProvider theme={themeConf}>
      <Box
        sx={{
          background: themeConf.palette.background.paper,
          minHeight: "100vh",
        }}
      >
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        {children}
      </Box>
    </ThemeProvider>
  );
};
