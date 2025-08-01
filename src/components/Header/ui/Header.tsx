"use client";

import { Text } from "@/components/Text";
import { TTheme } from "@/lib/types/types";
import { Box, Switch } from "@mui/material";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export const Header = ({
  themeMode,
  setThemeMode,
}: {
  themeMode: TTheme;
  setThemeMode: Dispatch<SetStateAction<TTheme>>;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      <Switch
        checked={themeMode === "dark"}
        onChange={(e) => {
          if (e.target.checked) {
            setThemeMode("dark");
          } else {
            setThemeMode("light");
          }
        }}
      />
      <Text text={themeMode} />

      <Link href={"/speed-test"}>
        <Text
          text="Speed-test"
          sx={{ color: "primary.light", marginLeft: "30px" }}
        />
      </Link>
    </Box>
  );
};
