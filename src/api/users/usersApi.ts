"use server";

import { db } from "@/db";
import { UsersTable } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const data = await db.query.UsersTable.findMany();

  return data;
}

export async function createUser(data: typeof UsersTable.$inferInsert) {
  const [newUser] = await db.insert(UsersTable).values(data).returning();

  if (!newUser) throw new Error("Failed to create user");

  revalidatePath("/");

  return newUser;
}
