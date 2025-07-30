import { getUsers } from "@/lib/api/users/usersApi";
import { Box } from "@mui/material";
import { User } from "@/components/User";

export default async function Home() {
  const users = await getUsers();

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
          return <User key={e.id} id={e.id} name={e.name || e.email} />;
        })}
      </Box>
    </div>
  );
}
