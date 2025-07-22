"use client";

import { authenticate } from "@/lib/api/authenticate";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import { useActionState, useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction}>
      {isPending && <CircularProgress />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormControl>
          <TextField
            name="email"
            value={email}
            label="Email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            name="password"
            value={password}
            type="password"
            label="Password"
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </FormControl>
        <Button
          onClick={() => {
            console.log();
          }}
          type="submit"
          variant="contained"
        >
          Login
        </Button>

        {errorMessage && <div>errorMessage</div>}
      </Box>
    </form>
  );
};
