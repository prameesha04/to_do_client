import api from "./api.js";

export const register = (payload) => api.post("/auth/register", payload);
export const login = (payload) => api.post("/auth/login", payload);
export const fetchProfile = () => api.get("/user/me");
export const updateProfile = (payload) => api.patch("/user/me", payload);
