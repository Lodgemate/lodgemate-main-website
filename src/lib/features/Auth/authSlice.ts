import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  data: {
    _id: string;
    firstName: string;
    profilePicture?: string;
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
    logOut: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.data;
export default authSlice.reducer;
