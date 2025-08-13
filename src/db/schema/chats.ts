import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { ChatMembersTable } from "./chatMembers";

export const chatTypes = ["private", "group"] as const;
export type TChatType = (typeof chatTypes)[number];
export const chatTypeEnum = pgEnum("chat_type", chatTypes);

export const ChatsTable = pgTable("chats", {
  id,
  name: varchar({ length: 255 }),
  type: chatTypeEnum().notNull(),
  createdAt,
  updatedAt,
});

export const CourseRelationships = relations(ChatMembersTable, ({ many }) => ({
  members: many(ChatMembersTable),
}));
