import { db } from "@/db";
import { UsersTable } from "@/db/schema";

export async function getUsers() {
  return db.query.UsersTable.findMany()
}

export async function insertUser(data: typeof UsersTable.$inferInsert) {
  const [newUser] = await db.insert(UsersTable).values(data).returning();

  if (!newUser) throw new Error("Failed to create user");

  return newUser;
}
