import z from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Заполни поле email" }).trim(),
    password: z
      .string()
      .min(1, { message: "Заполни пароль" })
      .min(5, { message: "Пароль должен быть длиннее 5 символов" })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Заполни поле" })
      .trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли должны совпадать",
        path: ["confirmPassword"],
      });
    }
  });
