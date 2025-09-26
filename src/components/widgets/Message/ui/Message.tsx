"use client";

import { Text } from "@/components/shared/Text";
import { IMessage } from "@/lib/types/types";

export const Message = ({
  message,
  className,
}: {
  message: IMessage;
  className?: string;
}) => {
  return (
    <div className={className}>
      <Text text={message.text} />
    </div>
  );
};
