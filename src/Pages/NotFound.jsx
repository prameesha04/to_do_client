import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h2">404</Typography>
      <Typography variant="h6">
        Page not found. Return to your dashboard.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/dashboard")}>
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
