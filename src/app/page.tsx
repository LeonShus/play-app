import { getUsers } from "@/api/users/usersApi";
import { Box, Button } from "@mui/material";

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
        {users?.map((e, index) => {
          return <div key={index}>{e.name}</div>;
        })}
        <Button variant="contained">Get Users</Button>
      </Box>
    </div>
  );
}
