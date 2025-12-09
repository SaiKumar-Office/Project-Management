// src/Apis/authApi.ts
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json"
  },
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

export type AuthResponse = {
  access_token: string;
  token_type: "bearer";
};

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  // FastAPI expects OAuth2PasswordRequestForm for /auth/login. We will send as form data.
  const body = new URLSearchParams();
  body.append("username", email);
  body.append("password", password);

  const res = await api.post<AuthResponse>("/auth/login", body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
  return res.data;
};

export const signupApi = async (name: string, email: string, password: string) => {
  const res = await api.post("/auth/signup", { name, email, password });
  return res.data; // returns user object
};

export const fetchMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export default api;
