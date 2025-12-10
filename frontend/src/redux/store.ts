import { configureStore } from '@reduxjs/toolkit';
import loginUserSlice from './Login/loginUserSlice';
import userSlice from './User/userSlice';

const store = configureStore({
  reducer: {
    loginUser: loginUserSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
