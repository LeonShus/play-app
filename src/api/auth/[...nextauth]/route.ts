import { db } from "@/db";
import { UsersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;

            db

            // const user = await db.query.UsersTable.findFirst({
            //   where: eq(UsersTable.email, email),
            // });
            // // const user = await getUser({ email });

            // // console.log("user", user);

            // if (!user) {
            //   return null;
            // }

            // const passwordMatch = await bcrypt.compare(password, user.password);

            // console.log("passwordMatch", passwordMatch);

            // if (passwordMatch) {
            //   const { password, ...userData } = user;
            //   return userData;
            // }

            return {
              email,
              password,
            };
          }

          return null;
        } catch {
          return new Error("authorize CRUSH");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session @@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
