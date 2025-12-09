// src/redux/Login/loginUserSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi, signupApi, fetchMe } from "../../Apis/authApi";

type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};

// login thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload.email, payload.password);
      // data.access_token
      return data.access_token;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// signup thunk
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (payload: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await signupApi(payload.name, payload.email, payload.password);
      return user;
    } catch (err: any) {
      const message = err.response?.data?.detail || err.message || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

// fetch me thunk (after login)
export const loadCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const user = await fetchMe();
      return user as User;
    } catch (err: any) {
      return rejectWithValue("Failed to load user");
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, action) => {
        s.loading = false;
        s.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      })

      .addCase(signupUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signupUser.fulfilled, (s, action) => {
        s.loading = false;
        // user created — you can optionally auto-login
      })
      .addCase(signupUser.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload as string;
      })

      .addCase(loadCurrentUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loadCurrentUser.fulfilled, (s, action) => {
        s.loading = false;
        s.user = action.payload;
        localStorage.setItem("username", action.payload.name);
      })
      .addCase(loadCurrentUser.rejected, (s) => {
        s.loading = false;
      });
  }
});

export const { logout, setToken } = slice.actions;
export default slice.reducer;
