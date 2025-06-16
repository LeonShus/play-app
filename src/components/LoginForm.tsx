"use client";

import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <TextField
        value={email}
        label="Email"
        placeholder="Enter email"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <TextField
        value={password}
        type="password"
        label="Password"
        placeholder="Enter password"
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <Button
        onClick={() => {

        }}
        variant="contained"
      >
        Create
      </Button>
    </Box>
  );
};
