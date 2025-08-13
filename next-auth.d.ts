import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    // Другие кастомные поля, если нужно
  }

  interface Session {
    user: User;
  }
}
