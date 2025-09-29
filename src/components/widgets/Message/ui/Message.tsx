"use client";

import { Text } from "@/components/shared/Text";
import { IAuthSessionUser, IMessage, IUser } from "@/lib/types/types";
import { StyledMessageContainer } from "./styled";

export const Message = ({
  authUser,
  author,
  message,
  className,
}: {
  authUser: IAuthSessionUser;
  author: IUser;
  message: IMessage;
  className?: string;
}) => {
  const isAuthor = author.id === authUser.id;

  const date = new Date(message.updatedAt).toLocaleDateString();

  return (
    <StyledMessageContainer className={className} isAuthor={isAuthor}>
      <div>
        <Text text={author.name || author.email} size={12} />
        <Text text={message.text} />
        <Text text={date} size={12} />
      </div>
    </StyledMessageContainer>
  );
};
