"use server";

import { db } from "@/db";
import { MessagesTable } from "@/db/schema";
import { messageFormSchema } from "@/lib/formSchemas/message";
import { IMessageFormState } from "@/lib/types/types";

import { revalidatePath } from "next/cache";

export async function sendMessage({
  prevState,
  formData,
  chatId,
  userId,
}: {
  prevState: IMessageFormState;
  formData: FormData;
  chatId: string;
  userId: string;
}) {
  try {
    const validate = messageFormSchema.safeParse({
      message: formData.get("message"),
    });

    if (validate.success && chatId && userId) {
      console.log('!!!!!!!!!!!!!!!!!')
      await createMessage({
        text: validate.data.message,
        chatId,
        userId,
      });

      return {
        errors: null,
        errorMessage: "",
        message: "",
      };
    }

    return {
      errors: validate.error?.flatten().fieldErrors,
      errorMessage: "",
      message: formData.get("message") as string,
    };
  } catch (error) {
    if (error) {
      return {
        errorMessage: "Error send message",
        message: formData.get("message") as string,
      };
    }
    throw error;
  }
}

export async function createMessage(data: typeof MessagesTable.$inferInsert) {
  const { chatId, text, userId } = data;

  const [newMessage] = await db
    .insert(MessagesTable)
    .values({ chatId, userId, text })
    .returning();

  if (!newMessage) throw new Error("Ошибка при создании сообщения");

  revalidatePath(`/messages`);
  // revalidatePath(`/messages/${chatId}`);

  return newMessage;
}
