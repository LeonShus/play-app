"use server";

import { registerFormSchema } from "@/lib/formSchemas/register";
import { IAuthFormState } from "@/lib/types/types";
import { AuthError } from "next-auth";
import { createUser } from "../users/usersApi";

export async function register(
  prevState: IAuthFormState,
  formData: FormData
): Promise<IAuthFormState> {
  try {
    const validate = registerFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (validate.success) {
      const { email, password } = validate.data;

      try {
        await createUser({ email, password });
      } catch (error: any) {
        return {
          errors: undefined,
          errorMessage: error.message,
          email: formData.get("email") as string,
        };
      }
    }

    return {
      errors: validate.error?.flatten().fieldErrors,
      errorMessage: "",
      email: formData.get("email") as string,
    };
  } catch (error) {
    return {
      errors: undefined,
      errorMessage: "Что-то пошло не так",
      email: "",
    };
  }
}
