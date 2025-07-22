import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
// import { authConfig } from "../auth.config";
import { getUser } from "./lib/api/users/usersApi";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // ...authConfig,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("111111111111111111111111");

      return false;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        console.log("!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#");

        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        if (user) {
          return user;
        } else {
          return null;
        }

        // const parsedCredentials = z
        //   .object({ email: z.string().email(), password: z.string().min(6) })
        //   .safeParse(credentials);

        // if (parsedCredentials.success) {
        //   const { email, password } = parsedCredentials.data;

        //   const user = await getUser({ email });

        //   if (!user) {
        //     return null;
        //   }

        //   const passwordMatch = await bcrypt.compare(password, user.password);

        //   if (passwordMatch) {
        //     const { password, ...userData } = user;
        //     return userData;
        //   }
        // }

        // return null;
      },
    }),
  ],
});
