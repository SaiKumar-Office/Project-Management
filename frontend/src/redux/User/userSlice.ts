// src/redux/User/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMeApi, getAllUsersApi } from "../../Apis/authApi";

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface UserState {
    currentUser: UserData | null;
    allUsers: UserData[];
    loading: boolean;
}

const initialState: UserState = {
    currentUser: null,
    allUsers: [],
    loading: false,
};

// Fetch current user
export const fetchMe = createAsyncThunk(
    "user/fetchMe",
    async (token: string, { rejectWithValue }) => {
        try {
            return await getMeApi(token);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

// Fetch all users (admin)
export const fetchAllUsers = createAsyncThunk(
    "user/fetchAllUsers",
    async (token: string, { rejectWithValue }) => {
        try {
            return await getAllUsersApi(token);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            });
    },
});

export default userSlice.reducer;
