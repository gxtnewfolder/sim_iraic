import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "sim kmutt",
  user:[]
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = 'sim login'
      state.user= 'hello sim'
    },
    logout: (state) => {
      state.value = 'sim logout'
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;