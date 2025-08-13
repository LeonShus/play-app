"use client";

import { Text } from "@/components/shared/Text";
import { IAuthSessionUser, TTheme } from "@/lib/types/types";
import { Box, Switch } from "@mui/material";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export const Header = ({
  themeMode,
  setThemeMode,
  authUser,
}: {
  themeMode: TTheme;
  setThemeMode: Dispatch<SetStateAction<TTheme>>;
  authUser: IAuthSessionUser;
}) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={"10px 20px"}
      border={"1px solid green"}
    >
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
        <Link href={"/chatting"}>
          <Text
            text="Chatting"
            sx={{ color: "primary.light", marginLeft: "30px" }}
          />
        </Link>
      </Box>
      {authUser && <Text text={authUser.name || authUser.email} />}
    </Box>
  );
};
