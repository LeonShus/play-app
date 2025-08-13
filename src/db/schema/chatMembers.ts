import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";

import { UsersTable } from "./users";
import { ChatsTable } from "./chats";
import { relations } from "drizzle-orm";

export const ChatMembersTable = pgTable(
  "chat_members",
  {
    chatId: uuid()
      .notNull()
      .references(() => ChatsTable.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.chatId, t.userId] })]
);

// Обьявляем связь таблицы с 2мя другими
export const ChatMembersRelationships = relations(
  ChatMembersTable,
  ({ one }) => ({
    chatId: one(ChatsTable, {
      fields: [ChatMembersTable.chatId],
      references: [ChatsTable.id],
    }),
    userId: one(UsersTable, {
      fields: [ChatMembersTable.userId],
      references: [UsersTable.id],
    }),
  })
)