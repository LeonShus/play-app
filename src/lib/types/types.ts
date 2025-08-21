import {
  ChatMembersTable,
  ChatsTable,
  MessagesTable,
  UsersTable,
} from "@/db/schema";

export type TTheme = "light" | "dark";
type TUser = typeof UsersTable.$inferSelect;
export type TChat = typeof ChatsTable.$inferSelect;
export type TMember = typeof ChatMembersTable.$inferSelect;
export type TMessage = typeof MessagesTable.$inferSelect;

export interface IAuthFormState {
  success?: boolean;
  email?: string | null;
  errors?:
    | {
        email?: string[] | undefined;
        password?: string[] | undefined;
        confirmPassword?: string[] | undefined;
      }
    | undefined;
  errorMessage?: string | null;
}

export interface IMessageFormState {
  message: string;
  errorMessage: string | null;
  errors?:
    | {
        message?: string[] | undefined;
      }
    | undefined;
}

export interface IAuthSessionUser {
  id: string;
  email: string;
  name: string | null;
}

export interface IUser extends Omit<TUser, "password"> {
  generalPrivate?: boolean;
}

export interface IMember extends TMember {
  user: IUser;
}

export interface IMessage extends TMessage {}

export interface IChat extends TChat {
  members: IMember[];
  messages: IMessage[];
}
