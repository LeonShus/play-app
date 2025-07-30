"use server";

import { registerFormSchema } from "@/lib/formSchemas/register";
import { IAuthFormState } from "@/lib/types/types";
import { createUser } from "../users/usersApi";
import { signIn } from "@/auth";

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
        const user = await createUser({ email, password });

        if (user?.id) {
          await signIn("credentials", {
            email: user.email,
            password: password,
            redirect: false,
          });

          return { success: true };
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          return {
            errors: undefined,
            errorMessage: error.message,
            email: formData.get("email") as string,
          };
        }
      }
    }

    return {
      errors: validate.error?.flatten().fieldErrors,
      errorMessage: "",
      email: formData.get("email") as string,
    };
  } catch {
    return {
      errors: undefined,
      errorMessage: "Что-то пошло не так",
      email: "",
    };
  }
}
