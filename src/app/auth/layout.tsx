import { Box } from "@mui/material";

import React, { ReactNode, Suspense } from "react";

export default function ConsumerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense>
      <Box
        minHeight={"500px"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Suspense>
  );
}
