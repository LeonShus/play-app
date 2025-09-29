import { styled } from "@mui/material";

export const StyledMessageContainer = styled(
  "div",
  {}
)<{ isAuthor: boolean }>(({ isAuthor }) => {
  return {
    display: "flex",
    flexDirection: "column",

    alignItems: isAuthor ? "end" : "start",
  };
});
