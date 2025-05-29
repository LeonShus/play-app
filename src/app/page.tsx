import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Box sx={{padding: '20px', display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained">Get Users</Button>
      </Box>
    </div>
  );
}
