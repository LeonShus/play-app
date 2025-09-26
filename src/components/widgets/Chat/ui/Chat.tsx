"use client";

import { Text } from "@/components/shared/Text";
import { sendMessage } from "@/lib/api/messages/messagesApi";
import { IAuthSessionUser, IChat, IMessageFormState } from "@/lib/types/types";
import { Box, Button, TextField } from "@mui/material";
import { useActionState } from "react";
import { Message } from "../../Message";
import { StyledChatBox } from "./styles";

export const Chat = ({
  chat,
  authUser,
}: {
  chat: IChat;
  authUser: IAuthSessionUser;
}) => {
  const handler = async (state: IMessageFormState, formData: FormData) => {
    return sendMessage({
      prevState: state,
      formData,
      chatId: chat.id,
      userId: authUser.id,
    });
  };

  const [state, formAction, isPending] = useActionState(
    handler as (
      state: IMessageFormState,
      formData?: FormData
    ) => Promise<IMessageFormState>,
    {
      message: "",
      errorMessage: null,
    }
  );

  console.log("state", state);

  console.log("chat", chat);

  return (
    <Box
      border={"1px solid green"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {chat.id}

      {Boolean(chat.messages.length) && (
        <StyledChatBox>
          {chat.messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
        </StyledChatBox>
      )}

      <Box>
        <form action={formAction}>
          <TextField
            defaultValue={state.message}
            name="message"
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rows={3}
            fullWidth
          />

          <Button loading={isPending} type="submit">
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
};
