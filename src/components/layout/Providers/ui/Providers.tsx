"use client";

import { Header } from "@/components/layout/Header";
import { IAuthSessionUser, TTheme } from "@/lib/types/types";

import { Box, CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { ReactNode, useMemo, useState } from "react";

export const Providers = ({
  children,
  authUser,
}: {
  children: ReactNode;
  authUser: IAuthSessionUser;
}) => {
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
        <Header
          authUser={authUser}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />
        {children}
      </Box>
    </ThemeProvider>
  );
};
