import { LoginForm } from "@/components/LoginForm";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default async function Login() {
  return (
    <div>
      <Suspense>
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginForm />
        </Box>
      </Suspense>
    </div>
  );
}
