ALTER TABLE "chats" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."chat_type";--> statement-breakpoint
CREATE TYPE "public"."chat_type" AS ENUM('private', 'group');--> statement-breakpoint
ALTER TABLE "chats" ALTER COLUMN "type" SET DATA TYPE "public"."chat_type" USING "type"::"public"."chat_type";