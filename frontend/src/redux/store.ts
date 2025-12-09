// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./Login/loginUserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
