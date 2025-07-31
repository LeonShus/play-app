import { styled } from "@mui/material";

export const StyledProgressWrapper = styled("div")({
  width: "100%",
  position: "relative",

  ".progress_text": {
    position: "absolute",
    zIndex: "1",
    color: "#fff",
    left: "50%",
    transform: "translate(-50%)",
  },
});
