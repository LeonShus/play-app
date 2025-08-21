import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";

import { UsersTable } from "./users";
import { ChatsTable } from "./chats";
import { relations } from "drizzle-orm";

export const MessagesTable = pgTable(
  "message",
  {
    id,
    text: varchar({ length: 255 }).notNull(),
    chatId: uuid()
      .notNull()
      .references(() => ChatsTable.id, { onDelete: "cascade" }),
    userId: uuid()
      .notNull()
      .references(() => UsersTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [{ columns: [t.chatId, t.userId] }]
);

// Обьявляем связь таблицы с 2мя другими
export const MessagesRelationships = relations(MessagesTable, ({ one }) => ({
  chatId: one(ChatsTable, {
    fields: [MessagesTable.chatId],
    references: [ChatsTable.id],
  }),
  userId: one(UsersTable, {
    fields: [MessagesTable.userId],
    references: [UsersTable.id],
  }),
}));
