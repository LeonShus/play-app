import { IAuthSessionUser, IChat } from "@/lib/types/types";

export const getChatName = ({
  chat,
  authUser,
}: {
  chat: IChat;
  authUser: IAuthSessionUser;
}) => {
  let name = chat.name;

  if (chat.type === "private") {
    const companion = chat.members.find(
      (member) => member.userId !== authUser.id
    );

    name = companion?.user.name || companion?.user.email || "-";
  }

  return name;
};
