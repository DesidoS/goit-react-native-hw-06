import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  stateChange: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUser: (state, actions) => ({
      ...state,
      userId: actions.payload.userId,
      userName: actions.payload.userName,
    }),
    authStateChange: (state, actions) => ({
      ...state,
      stateChange: actions.payload.stateChange,
    }),
    authSignOut: () => state,
  },
});
