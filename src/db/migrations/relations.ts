import { relations } from "drizzle-orm/relations";
import { users, chatMembers, chats } from "./schema";

export const chatMembersRelations = relations(chatMembers, ({one}) => ({
	user: one(users, {
		fields: [chatMembers.userId],
		references: [users.id]
	}),
	chat: one(chats, {
		fields: [chatMembers.chatId],
		references: [chats.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	chatMembers: many(chatMembers),
}));

export const chatsRelations = relations(chats, ({many}) => ({
	chatMembers: many(chatMembers),
}));