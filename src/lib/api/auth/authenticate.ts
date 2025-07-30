"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { loginFormSchema } from "../../formSchemas/login";
import { IAuthFormState } from "@/lib/types/types";

export async function authenticate(
  prevState: IAuthFormState,
  formData: FormData
): Promise<IAuthFormState> {
  try {
    const validate = loginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (validate.success) {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: true,
      });
    }

    return {
      errors: validate.error?.flatten().fieldErrors,
      errorMessage: "",
      email: formData.get("email") as string,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: undefined,
            errorMessage: "Invalid credentials.",
            email: formData.get("email") as string,
          };
        default:
          return {
            errors: undefined,
            errorMessage: "Invalid credentials.",
            email: formData.get("email") as string,
          };
      }
    }
    throw error;
  }
}
