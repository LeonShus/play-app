import { Box } from "@mui/material";

export default async function Home() {
  return (
    <div>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>MAIN PAGE</div>
      </Box>
    </div>
  );
}
