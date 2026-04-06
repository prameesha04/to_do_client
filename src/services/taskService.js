import api from "./api.js";

export const fetchTasks = (status) =>
  api.get("/todos", {
    params: status && status !== "all" ? { status } : {},
  });
export const addTask = (payload) => api.post("/todos", payload);
export const updateTask = (id, payload) => api.put(`/todos/${id}`, payload);
export const deleteTask = (id) => api.delete(`/todos/${id}`);
