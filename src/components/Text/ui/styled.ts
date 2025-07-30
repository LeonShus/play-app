import { styled } from "@mui/material";

export const StyledText = styled(
  "p",
  {}
)<{ size: number; weight: number }>(({ theme, size, weight }) => {
  return {
    fontFamily: "Roboto",
    color: theme.palette.text.primary,
    fontSize: `${size}px`,
    fontWeight: weight,
  };
});
