"use server";

import { db } from "@/db";
import { ChatMembersTable, ChatsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getChats() {
  const chats = await db.query.ChatsTable.findMany();

  return chats;
}

export async function createChat({
  chatData,
  chatMembersData,
}: {
  chatData: typeof ChatsTable.$inferInsert;
  chatMembersData: { userId: string }[];
}) {
  const newChat = await db.transaction(async (trx) => {
    const [chat] = await trx.insert(ChatsTable).values(chatData).returning();

    if (!chat.id) {
      trx.rollback();
      throw new Error("Не получилось создать чат");
    }

    await trx.insert(ChatMembersTable).values(
      chatMembersData.map((item) => ({
        chatId: chat.id,
        userId: item.userId,
      }))
    );

    return chat;
  });

  revalidatePath("/chats");

  return newChat;
}

export async function removeChat({ chatId }: { chatId: string }) {
  const [data] = await db
    .delete(ChatsTable)
    .where(eq(ChatsTable.id, chatId))
    .returning();

  if (!data) {
    throw new Error("Failed to delete chat");
  }
  revalidatePath("/chats");

  return { sucsess: true };
}
