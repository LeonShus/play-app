ALTER TABLE "chat_members" DROP CONSTRAINT "chat_members_chatId_chats_id_fk";
--> statement-breakpoint
ALTER TABLE "chat_members" ADD CONSTRAINT "chat_members_chatId_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;