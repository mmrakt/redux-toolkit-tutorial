import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "タナカ" },
  { id: "1", name: "スズキ" },
  { id: "2", name: "ナカムラ" },
];

const usersSlice = createSlice({ name: "users", initialState, reducers: {} });

export default usersSlice.reducer;
