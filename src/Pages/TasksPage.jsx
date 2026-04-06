import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  addTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/taskService.js";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async (status = "all") => {
    try {
      const response = await fetchTasks(status);
      setTasks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(activeFilter);
  }, [activeFilter]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      await addTask({ todo: newTask.trim() });
      setNewTask("");
      loadTasks(activeFilter);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks(activeFilter);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      loadTasks(activeFilter);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (task) => {
    const updated = window.prompt("Update task title", task.todo);
    if (!updated || !updated.trim()) return;
    try {
      await updateTask(task._id, { todo: updated.trim() });
      loadTasks(activeFilter);
    } catch (err) {
      console.error(err);
    }
  };

  const totals = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    }),
    [tasks],
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
        <TextField
          label="Add a new task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleAddTask}
          sx={{ minWidth: 160 }}
        >
          Add Task
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 4 }}>
        {statusFilters.map((filter) => (
          <Chip
            key={filter.value}
            label={filter.label}
            clickable
            color={activeFilter === filter.value ? "primary" : "default"}
            onClick={() => setActiveFilter(filter.value)}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4 }}>
        <Chip label={`Total ${totals.total}`} color="primary" />
        <Chip label={`Completed ${totals.completed}`} color="success" />
        <Chip label={`Pending ${totals.pending}`} color="warning" />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Typography sx={{ color: "text.secondary" }}>
          No tasks available yet. Create a task to get started.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} key={task._id}>
              <Card
                sx={{ backgroundColor: task.completed ? "#d1fae5" : "#f8fafc" }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggle(task)}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.todo}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleEdit(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(task._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TasksPage;
