import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  data: {
    _id: string;
    firstName: string;
  } | null;
  status: string;
  error: string | null;
}
const initialState: initialStateType = {
  data: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.data;
export default authSlice.reducer;
