import { auth } from "@/auth";
import { ChatItem } from "@/components/widgets/ChatItem";
import { IChat } from "@/lib/types/types";
import { Box } from "@mui/material";

export const Chatting = async ({ chats }: { chats: IChat[] }) => {
  const session = await auth();

  if (!session?.user) {
    return <></>;
  }

  return (
    <Box>
      Chatting
      {chats.map((chat) => {
        return <ChatItem key={chat.id} authUser={session.user} chat={chat} />;
      })}
    </Box>
  );
};
