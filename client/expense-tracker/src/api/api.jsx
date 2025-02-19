import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/auth", // ✅ Make sure this matches your backend URL
});

// Add token to requests if user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication API Calls
export const login = (userData) => API.post("/login", userData);
export const register = (userData) => API.post("/register", userData);
export const getProfile = () => API.get("/profile");

// Password Reset APIs
export const requestPasswordReset = (data) =>
  API.post("/forgot-password", data); // ✅ Fixed API call
export const resetPassword = async (token, data) => {
  return await axios.put(`${API_URL}/reset-password/${token}`, data);
};
