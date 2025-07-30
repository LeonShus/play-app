import { ReactNode } from "react";
import { StyledText } from "./styled";
import { SxProps, Theme } from "@mui/material";

export const Text = ({
  text,
  size = 16,
  weight = 300,
  sx,
}: {
  text: string | ReactNode;
  size?: number;
  weight?: number;
  sx?: SxProps<Theme>;
}) => {
  return (
    <StyledText sx={sx} size={size} weight={weight}>
      {text}
    </StyledText>
  );
};
