import axios from "axios";

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper function for attaching auth token in headers
const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Auth API
export const login = async (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);

export const register = async (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);

// Expense API
export const fetchExpenses = async (token) =>
  axios.get(`${API_URL}/expenses`, getAuthHeaders(token));

export const addExpense = async (expenseData, token) =>
  axios.post(`${API_URL}/expenses/add`, expenseData, getAuthHeaders(token));

export const deleteExpense = async (id, token) =>
  axios.delete(`${API_URL}/expenses/${id}`, getAuthHeaders(token));

// Report API (downloads a file)
export const downloadReport = async (month, year, token) =>
  axios.get(`${API_URL}/expenses/report/download?month=${month}&year=${year}`, {
    ...getAuthHeaders(token),
    responseType: "blob",
  });
