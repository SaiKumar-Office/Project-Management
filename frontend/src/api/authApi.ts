import axios from "axios";

// const API_BASE_URL = process.env.BACKEND_URL; // Backend URL
const API_BASE_URL = "http://localhost:8000"

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async (token: string) => {
  const response = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
