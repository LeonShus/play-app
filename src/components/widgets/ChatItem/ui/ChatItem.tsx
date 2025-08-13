import { Text } from "@/components/shared/Text";
import { IAuthSessionUser, IChat } from "@/lib/types/types";
import { Box } from "@mui/material";
import { getChatName } from "./utils";

export const ChatItem = async ({
  chat,
  authUser,
}: {
  chat: IChat;
  authUser: IAuthSessionUser;
}) => {
  const chatName = getChatName({ chat, authUser });

  return (
    <Box border={"1px solid blue"} padding={"20px"}>
      <Text weight={500} text={chatName} />
    </Box>
  );
};
