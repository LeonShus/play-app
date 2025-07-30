export type TTheme = "light" | "dark";

export interface IAuthFormState {
  email: string | null;
  errors:
    | {
        email?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
      }
    | undefined;
  errorMessage: string | null;
}
