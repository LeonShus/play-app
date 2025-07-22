"use server";

import { db } from "@/db";
import { UsersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUser({email}: {email: string}) {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email)
  });

    if (!user?.id) {
    throw new Error("User not exist");
  }

  return user;
}

export async function getUsers() {
  const data = await db.query.UsersTable.findMany();

  return data;
}

export async function createUser(data: typeof UsersTable.$inferInsert) {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, data.email),
  });

  if (user?.id) {
    throw new Error("User already exist");
  }

  const { password, ...fields } = data;

  const hash = bcrypt.hashSync(data.password, 10);

  const [newUser] = await db
    .insert(UsersTable)
    .values({ ...fields, password: hash })
    .returning();

  if (!newUser) throw new Error("Failed to create user");

  revalidatePath("/");

  return newUser;
}

export async function removeUser({ userId }: { userId: number }) {
  const data = await db
    .delete(UsersTable)
    .where(eq(UsersTable.id, userId))
    .returning();

  if (!data.length) {
    throw new Error("Failed to delete user");
  }
  revalidatePath("/");
  console.log("1@#!@#!@#", data);
}
