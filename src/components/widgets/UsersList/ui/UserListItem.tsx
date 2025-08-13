"use client";
import { Text } from "@/components/shared/Text";
import { createChat } from "@/lib/api/chats/chatsApi";
import { IAuthSessionUser, IUser } from "@/lib/types/types";
import { Box, Button } from "@mui/material";

export const UserListItem = ({
  user,
  authUser,
}: {
  authUser: IAuthSessionUser;
  user: IUser;
}) => {
  const createChatHandler = async ({ userId }: { userId: string }) => {
    try {
      await createChat({
        chatData: { name: "", type: "private" },
        chatMembersData: [{ userId: authUser.id }, { userId: userId }],
      });
    } catch {
      // console.log("Erroc reateChat", e);
    }
  };

  return (
    <Box
      key={user.id}
      border={"1px solid red"}
      padding={"20px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Text weight={500} text={user.name || user.email} />

      {!user.generalPrivate && (
        <Button
          onClick={() => {
            createChatHandler({ userId: user.id });
          }}
        >
          Create chat
        </Button>
      )}
    </Box>
  );
};
