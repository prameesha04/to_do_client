import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Paper } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #0f172a 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{ p: 6, backgroundColor: "rgba(15, 23, 42, 0.95)", boxShadow: 6 }}
        >
          <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
            Build your productivity with TaskWave.
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: "#cbd5e1" }}>
            A polished task management experience with secure login, personal
            dashboards, and team-focused workflows.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
