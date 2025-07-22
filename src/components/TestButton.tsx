"use client";

import { createUser } from "@/lib/api/users/usersApi";
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

export const TestButton = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const create = async () => {
    await createUser({ age: 22, email: email, name: name, password });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        placeholder="email"
      />
      <Input
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        placeholder="name"
      />
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        placeholder="password"
      />
      <Button
        onClick={() => {
          create();
        }}
        variant="contained"
      >
        Create
      </Button>
    </Box>
  );
};
