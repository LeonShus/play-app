import { db } from "@/db";
import { UsersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Валидируем поля
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (!parsedCredentials.success) {
            return null;
          }

          // Находим юзера в Бд
          const { email, password } = parsedCredentials.data;

          const user = await db.query.UsersTable.findFirst({
            where: eq(UsersTable.email, email),
          });

          if (!user || !user.id) {
            return null;
          }

          // Проверяем совпадения пароля
          const { password: userPass, ...keys } = user;

          const isValidPass = await bcrypt.compare(password, userPass);

          if (!isValidPass) {
            return null;
          }

          return {
            id: String(keys.id),
            email: keys.email,
            name: keys.name,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       console.log("jwt @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       console.log("session @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  //       if (session.user) {
  //         session.user.id = token.id as string;
  //       }
  //       return session;
  //     },
  //   },
  //   pages: {
  //     signIn: "/login",
  //     error: "/auth/error",
  //   },
  //   secret: process.env.NEXTAUTH_SECRET,
});
