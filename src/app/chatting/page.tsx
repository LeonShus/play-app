import { auth } from "@/auth";
import { Chatting } from "@/components/screen/Chatting/ui/Chatting";
import { UsersList } from "@/components/widgets/UsersList/ui/UsersList";
import { db } from "@/db";
import {
  ChatMembersTable,
  ChatsTable,
  MessagesTable,
  UsersTable,
} from "@/db/schema";

import { IChat, IUser } from "@/lib/types/types";
import { Box } from "@mui/material";
import { and, eq, exists, inArray, ne, sql } from "drizzle-orm";

export default async function Main() {
  const session = await auth();

  if (!session?.user) {
    return <></>;
  }

  const users = await getChatUsers({ authUserId: session.user.id });

  const chats: IChat[] = await getChats({ authUserId: session.user.id });

  return (
    <Box display={"flex"} gap={2}>
      <UsersList users={users} />
      <Chatting chats={chats} authUser={session.user} />
    </Box>
  );
}

async function getChatUsers({ authUserId }: { authUserId: string }) {
  const users = await db.query.UsersTable.findMany({
    where: ne(UsersTable.id, authUserId),
  });

  // const usersId = users.map((user) => user.id);

  // const userMembers = await db
  //   .select({
  //     chatId: ChatMembersTable.chatId,
  //     userId: ChatMembersTable.userId,
  //   })
  //   .from(ChatMembersTable)
  //   .where(inArray(ChatMembersTable.userId, usersId));

  // const usersChatIds = userMembers.map((member) => member.chatId);

  // // console.log("userMembers", userMembers);

  // const usersPrivatChats = await db
  //   .select({ id: ChatsTable.id })
  //   .from(ChatsTable)
  //   .where(
  //     inArray(ChatsTable.id, usersChatIds) && eq(ChatsTable.type, "private")
  //   );

  // // console.log("usersPrivatChats", usersPrivatChats);

  // const usersPrivatChatsIds = usersPrivatChats.map((item) => item.id);

  // const generalPrivatChats = await db
  //   .select({
  //     chatId: ChatMembersTable.chatId,
  //     userId: ChatMembersTable.userId,
  //   })
  //   .from(ChatMembersTable)
  //   .where(
  //     inArray(ChatMembersTable.chatId, usersPrivatChatsIds) &&
  //       eq(ChatMembersTable.userId, authUserId)
  //   );

  // // console.log("generalPrivatChats", generalPrivatChats);

  // const userWithPrivateChat = generalPrivatChats.reduce(
  //   (obj: { [key: string]: boolean }, item) => {
  //     obj[item.userId] = true;

  //     return obj;
  //   },
  //   {}
  // );

  // console.log("userWithPrivateChat", userWithPrivateChat);

  const generalChats = await db
    .select({
      id: UsersTable.id,
      generalPrivate: ChatsTable.id,
    })
    .from(UsersTable)
    .leftJoin(ChatMembersTable, eq(UsersTable.id, ChatMembersTable.userId))
    .leftJoin(
      ChatsTable,
      and(
        eq(ChatMembersTable.chatId, ChatsTable.id),
        eq(ChatsTable.type, "private")
      )
    )
    // Добавляем условие, что текущий пользователь тоже состоит в этом чате
    .where(
      and(
        ne(UsersTable.id, authUserId),
        exists(
          db
            .select()
            .from(ChatMembersTable)
            .where(
              and(
                eq(ChatMembersTable.chatId, ChatsTable.id),
                eq(ChatMembersTable.userId, authUserId)
              )
            )
        )
      )
    );

  const generalChatKeys = generalChats.reduce(
    (obj: { [key: string]: boolean }, item) => {
      obj[item.id] = true;

      return obj;
    },
    {}
  );

  return users.map((user) => {
    return { ...user, generalPrivate: Boolean(generalChatKeys[user.id]) };
  }) as IUser[];
}

async function getChats({ authUserId }: { authUserId: string }) {
  // Находим все чаты в который пользователь участник
  const authUserChatMemers = await db
    .select({ chatId: ChatMembersTable.chatId })
    .from(ChatMembersTable)
    .where(eq(ChatMembersTable.userId, authUserId));

  const chatIds = authUserChatMemers.map((member) => member.chatId);

  // const chats = await db
  //   .select({
  //     id: ChatsTable.id,
  //     name: ChatsTable.name,
  //     type: ChatsTable.type,

  //     messages: sql`
  //     COALESCE(
  //       -- JSON_AGG - собирает все такие объекты в массив:
  //       JSON_AGG(
  //         -- JSON_BUILD_OBJECT - создаёт JSON-объект для каждого сообщения:
  //         JSON_BUILD_OBJECT(
  //           'userId', ${MessagesTable.userId},
  //           'chatId', ${MessagesTable.chatId},
  //           'id', ${MessagesTable.id},
  //           'text', ${MessagesTable.text}
  //         )
  //       -- FILTER (WHERE ...) - фильтрует только записи с существующими userId:
  //       ) FILTER (WHERE ${MessagesTable.id} IS NOT NULL),
  //       '[]'::json
  //     )
  //     `.as("messages"),

  //     members: sql`
  //      -- COALESCE - подставляет пустой массив, если нет участников:
  //     COALESCE(
  //       -- JSON_AGG - собирает все такие объекты в массив:
  //       JSON_AGG(
  //         -- JSON_BUILD_OBJECT - создаёт JSON-объект для каждого участника:
  //         JSON_BUILD_OBJECT(
  //           'userId', ${ChatMembersTable.userId},
  //           'chatId', ${ChatMembersTable.chatId},
  //           'user', JSON_BUILD_OBJECT(
  //             'id', ${UsersTable.id},
  //             'name', ${UsersTable.name},
  //             'email', ${UsersTable.email}
  //           )
  //         )
  //       -- FILTER (WHERE ...) - фильтрует только записи с существующими userId:
  //       ) FILTER (WHERE ${ChatMembersTable.userId} IS NOT NULL),
  //       '[]'::json
  //     )
  //   `.as("members"),
  //   })
  //   .from(ChatsTable)
  //   .where(inArray(ChatsTable.id, chatIds))
  //   .leftJoin(ChatMembersTable, eq(ChatMembersTable.chatId, ChatsTable.id))
  //   .leftJoin(UsersTable, eq(UsersTable.id, ChatMembersTable.userId))
  //   .leftJoin(MessagesTable, eq(MessagesTable.chatId, ChatsTable.id))
  //   .groupBy(ChatsTable.id);

  const chats = await db
    .select({
      id: ChatsTable.id,
      name: ChatsTable.name,
      type: ChatsTable.type,
    })
    .from(ChatsTable)
    .where(inArray(ChatsTable.id, chatIds));

  // Затем отдельно получаем сообщения и участников для каждого чата
  const chatsWithDetails = await Promise.all(
    chats.map(async (chat) => {
      const [messages, members] = await Promise.all([
        // Получаем сообщения
        db
          .select({
            userId: MessagesTable.userId,
            chatId: MessagesTable.chatId,
            id: MessagesTable.id,
            text: MessagesTable.text,
            updatedAt: MessagesTable.updatedAt,
          })
          .from(MessagesTable)
          .where(eq(MessagesTable.chatId, chat.id)),

        // Получаем участников с информацией о пользователе
        db
          .select({
            userId: ChatMembersTable.userId,
            chatId: ChatMembersTable.chatId,
            user: {
              id: UsersTable.id,
              name: UsersTable.name,
              email: UsersTable.email,
            },
          })
          .from(ChatMembersTable)
          .where(eq(ChatMembersTable.chatId, chat.id))
          .leftJoin(UsersTable, eq(UsersTable.id, ChatMembersTable.userId)),
      ]);

      return {
        ...chat,
        messages,
        members,
      };
    })
  );

  return chatsWithDetails as IChat[];
}
