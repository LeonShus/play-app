CREATE TYPE "public"."chat_type" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "chats" ADD COLUMN "type" "chat_type" NOT NULL;