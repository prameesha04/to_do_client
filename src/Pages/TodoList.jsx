import Alert from "@mui/material/Alert";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./css/Todo.css";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = () => {
  const [todo, setTodo] = React.useState("");
  const [status, setStatus] = useState(false);
  const [todoArray, setTodoArray] = useState([]);

  //create or post
  const postTodo = async () => {
    try {
      await axios.post(
        "https://todo-server-ec2-wuj3.onrender.com/csbs/addtodo",
        { todo }
      );

      setTodo("");
      setStatus(true);
      getTodo();
      setTimeout(() => setStatus(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  //read get
  const getTodo = async () => {
    await axios
      .get("https://todo-server-ec2-wuj3.onrender.com/csbs/gettodo")
      .then((response) => {
        setTodoArray(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://todo-server-ec2-wuj3.onrender.com/csbs/deletetodo/${id}`
      );
      getTodo();
    } catch (err) {
      console.error(err);
    }
  };
  const updateTodo = async (id, data) => {
    const newTodo = prompt("Enter new todo");
    try {
      await axios.put(
        `https://todo-server-ec2-wuj3.onrender.com/csbs/updatetodo/${id}`,
        {
          todo: data,
        }
      );
      getTodo();
    } catch (err) {
      console.error(err);
    }
  };
  const newTodo = async (id) => {
    const newData = prompt("Enter new todo");
    if (newData.trim() == "") {
      newTodo(id);
    }
    updateTodo(id, newData);
  };
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="todolist">
      <Typography variant="h1" gutterBottom>
        Todo
      </Typography>
      <Box sx={{ width: 900, maxWidth: "100%" }} className="box">
        <TextField
          fullWidth
          label="fullWidth"
          id="fullWidth"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button variant="contained" className="button" onClick={postTodo}>
          Add Todo
        </Button>
      </Box>
      {status && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Todo has been Posted
          </Alert>
        </div>
      )}
      <div>
        <ul>
          {todoArray.map((res) => (
            <li key={res._id} className="list">
              <h3>{res.todo}</h3>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => deleteTodo(res._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => newTodo(res._id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
