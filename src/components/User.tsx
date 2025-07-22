"use client";
import { removeUser } from "@/lib/api/users/usersApi";
import { Clear } from "@mui/icons-material";

export const User = ({ id, name }: { id: number; name: string }) => {
  const remove = async () => {
    try {
      removeUser({ userId: id });
    } catch {
      console.log("ERROR REMOVE");
    }
  };

  return (
    <div>
      {name}

      <Clear
        onClick={() => {
          remove();
        }}
      />
    </div>
  );
};
