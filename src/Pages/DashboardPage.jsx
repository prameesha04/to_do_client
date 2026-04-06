import { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { fetchTasks } from "../services/taskService.js";
import { useAuth } from "../contexts/AuthContext.jsx";

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome back, {user?.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Your task summary is ready. Manage your work and stay on top of your
        priorities.
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {[
            { label: "Total Tasks", value: total, color: "primary.main" },
            { label: "Completed", value: completed, color: "success.main" },
            { label: "Pending", value: pending, color: "warning.main" },
          ].map((card) => (
            <Grid item xs={12} sm={4} key={card.label}>
              <Paper sx={{ p: 3, borderLeft: `6px solid ${card.color}` }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  {card.label}
                </Typography>
                <Typography variant="h3">{card.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
