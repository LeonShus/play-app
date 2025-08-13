import { pgTable, uuid, varchar, timestamp, unique, integer, foreignKey, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const chatType = pgEnum("chat_type", ['private', 'group'])
export const userRole = pgEnum("user_role", ['user', 'admin'])


export const chats = pgTable("chats", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 255 }),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	type: chatType().notNull(),
});

export const users = pgTable("users", {
	name: varchar({ length: 255 }),
	age: integer(),
	email: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	surname: varchar({ length: 255 }),
	role: userRole().default('user').notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	id: uuid().defaultRandom().primaryKey().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const chatMembers = pgTable("chat_members", {
	chatId: uuid().notNull(),
	userId: uuid().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "chat_members_userId_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.chatId],
			foreignColumns: [chats.id],
			name: "chat_members_chatId_chats_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.chatId, table.userId], name: "chat_members_chatId_userId_pk"}),
]);
