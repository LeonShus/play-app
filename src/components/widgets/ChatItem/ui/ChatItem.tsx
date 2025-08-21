"use client";

import { Text } from "@/components/shared/Text";
import { IAuthSessionUser, IChat } from "@/lib/types/types";
import { Box } from "@mui/material";
import { getChatName } from "./utils";

export const ChatItem = ({
  chat,
  authUser,
  setCurrentChat,
}: {
  chat: IChat;
  authUser: IAuthSessionUser;
  setCurrentChat: (e: IChat) => void;
}) => {
  const chatName = getChatName({ chat, authUser });

  return (
    <Box
      onClick={() => {
        setCurrentChat(chat);
      }}
      border={"1px solid blue"}
      padding={"20px"}
    >
      <Text weight={500} text={chatName} />
    </Box>
  );
};
