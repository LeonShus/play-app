import { IUser } from "@/lib/types/types";
import { Box } from "@mui/material";
import { UserListItem } from "./UserListItem";
import { auth } from "@/auth";

export const UsersList = async ({ users }: { users: IUser[] }) => {
  const session = await auth();

  if (!session?.user) {
    return <></>;
  }
  return (
    <Box>
      All users
      {users.map((user) => {
        return <UserListItem key={user.id} authUser={session?.user} user={user} />;
      })}
    </Box>
  );
};
