// src/redux/Login/loginUserSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, signupApi, logoutApi } from "../../Apis/authApi";

interface LoginState {
    loading: boolean;
    token: string | null;
    error: string | null;
}

const initialState: LoginState = {
    loading: false,
    token: localStorage.getItem("token"),
    error: null,
};

// ---------------------- SIGNUP ----------------------
export const signupUser = createAsyncThunk(
    "auth/signup",
    async (data: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await signupApi(data);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ---------------------- LOGIN ----------------------
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await loginApi(data);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// ---------------------- LOGOUT ----------------------
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (token: string, { rejectWithValue }) => {
        try {
            await logoutApi(token);
            return true;
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const loginUserSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers: {
        // renamed to avoid conflict with thunk logoutUser
        clearUserState: (state) => {
            state.token = null;
            state.error = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // ---------------- LOGIN ----------------
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.access_token;
                localStorage.setItem("token", action.payload.access_token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // ---------------- LOGOUT ----------------
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
                localStorage.removeItem("token");
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUserState } = loginUserSlice.actions;
export default loginUserSlice.reducer;
