import { getUsers } from "@/api/users/usersApi";
import { TestButton } from "@/components/TestButton";
import { Box } from "@mui/material";

export default async function Home() {
  const users = await getUsers();

  console.log("users", users);

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

        <TestButton />
      </Box>
    </div>
  );
}
