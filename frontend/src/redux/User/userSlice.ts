import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.email = action.payload;
    },
  },
});

export const { setUserEmail } = userSlice.actions;
export default userSlice.reducer;
