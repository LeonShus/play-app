import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

export const userRoles = ["user", "admin"] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UsersTable = pgTable("users", {
  id,
  name: varchar({ length: 255 }),
  surname: varchar({ length: 255 }),
  age: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: userRoleEnum().notNull().default("user"),
  createdAt,
  updatedAt,
});
