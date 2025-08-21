"use client";

import { Chat } from "@/components/widgets/Chat";
import { ChatItem } from "@/components/widgets/ChatItem";
import { IAuthSessionUser, IChat } from "@/lib/types/types";
import { Box } from "@mui/material";
import { useState } from "react";

export const Chatting = ({
  authUser,
  chats,
}: {
  chats: IChat[];
  authUser: IAuthSessionUser;
}) => {
  const [currentChat, setCurrentChat] = useState<IChat | null>(null);


  return (
    <Box display={"flex"}>
      <Box>
        Chatting
        {chats.map((chat) => {
          return (
            <ChatItem
              key={chat.id}
              authUser={authUser}
              chat={chat}
              setCurrentChat={setCurrentChat}
            />
          );
        })}
      </Box>

      {currentChat && <Chat authUser={authUser} chat={currentChat} />}
    </Box>
  );
};
