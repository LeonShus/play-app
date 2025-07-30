import z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Неверный email" }).trim(),
  password: z.string().min(1, { message: "Заполни пароль" }).trim(),
});
