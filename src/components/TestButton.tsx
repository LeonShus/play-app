"use client";

import { createUser } from "@/api/users/usersApi";
import { Box, Button, Input } from "@mui/material";
import { useState } from "react";

export const TestButton = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const create = async () => {
    await createUser({ age: 22, email: email, name: name });
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
