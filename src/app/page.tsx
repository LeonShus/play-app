import { getUser, getUsers } from "@/lib/api/users/usersApi";
import { TestButton } from "@/components/TestButton";
import { Box } from "@mui/material";
import { User } from "@/components/User";
import { auth } from "@/api/auth/[...nextauth]/route";

export default async function Home() {
  const users = await getUsers();

  const res = await auth();

  const re2s = await getUser({ email: "test@test.ru" });

  console.log("res", res);

  
  console.log("rere2ss", re2s);

  return (
    <div>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {users?.map((e) => {
          return <User key={e.id} id={e.id} name={e.name} />;
        })}

        <TestButton />
      </Box>
    </div>
  );
}
