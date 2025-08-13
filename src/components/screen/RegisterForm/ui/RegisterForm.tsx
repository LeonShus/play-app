"use client";

import { Text } from "@/components/shared/Text";
import { register } from "@/lib/api/auth/register";
import { IAuthFormState } from "@/lib/types/types";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export const RegisterForm = () => {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<IAuthFormState>(
    register as (
      state: IAuthFormState,
      formData?: FormData
    ) => Promise<IAuthFormState>,
    {
      errors: undefined,
      errorMessage: "",
      email: "",
    }
  );

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state]);

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
      <Text
        text="Registration"
        size={24}
        weight={500}
        sx={{ marginBottom: "20px" }}
      />

      <form action={formAction} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormControl>
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

          <FormControl>
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Enter password"
            />
            {state?.errors?.confirmPassword && (
              <FormHelperText id="my-helper-text" sx={{ color: "error.light" }}>
                {state.errors.confirmPassword[0]}
              </FormHelperText>
            )}
          </FormControl>

          <Button loading={isPending} type="submit" variant="contained">
            Отправить
          </Button>

          {state?.errorMessage && (
            <Text
              size={14}
              text={state?.errorMessage}
              sx={{ color: "error.light", textAlign: "center" }}
            />
          )}
        </Box>
      </form>

      <Link href={"login"}>
        <Text
          text={"Уже зарегистрирован ?"}
          sx={{ color: "primary.light", marginTop: "20px" }}
        />
      </Link>
    </Paper>
  );
};
