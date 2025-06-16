import { getUsers } from "@/api/users/usersApi";
import { LoginForm } from "@/components/LoginForm";
import { TestButton } from "@/components/TestButton";
import { Box, TextField } from "@mui/material";

export default async function Login() {
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
        <LoginForm />
      </Box>
    </div>
  );
}
