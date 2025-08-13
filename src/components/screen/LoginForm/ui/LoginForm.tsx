"use client";

import { authenticate } from "@/lib/api/auth/authenticate";
import { AUTH_ERRORS } from "./constant";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
} from "@mui/material";
import { useActionState } from "react";
import { Text } from "@/components/shared/Text";
import Link from "next/link";
import { IAuthFormState } from "@/lib/types/types";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState<IAuthFormState>(
    authenticate as (
      state: IAuthFormState,
      formData?: FormData
    ) => Promise<IAuthFormState>,
    {
      errors: undefined,
      errorMessage: "",
      email: "",
    }
  );

  return (
    <Paper
      elevation={5}
      sx={{
        padding: "30px 30px 20px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "360px",
        width: "100%",
      }}
    >
      <Text text="Login" size={24} weight={500} sx={{ marginBottom: "20px" }} />

      <form action={formAction} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormControl sx={{ width: "100%" }}>
            <TextField
              name="email"
              label="Email"
              placeholder="Enter email"
              defaultValue={state.email}
            />
            {state?.errors?.email && (
              <FormHelperText id="my-helper-text" sx={{ color: "error.light" }}>
                {state.errors.email[0]}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="Enter password"
            />
            {state?.errors?.password && (
              <FormHelperText id="my-helper-text" sx={{ color: "error.light" }}>
                {state.errors.password[0]}
              </FormHelperText>
            )}
          </FormControl>

          <Button loading={isPending} type="submit" variant="contained">
            Войти
          </Button>

          {state?.errorMessage && (
            <Text
              size={14}
              text={AUTH_ERRORS[state?.errorMessage]}
              sx={{ color: "error.light", textAlign: "center" }}
            />
          )}
        </Box>
      </form>

      <Link href={"register"}>
        <Text
          text={"Регистрация"}
          sx={{ color: "primary.light", marginTop: "20px" }}
        />
      </Link>
    </Paper>
  );
};
