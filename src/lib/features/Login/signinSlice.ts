import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Endpoints } from "@/services/Api/endpoints";
const signInurl = Endpoints.signIn;
interface initialStateType {
  data: ApiResponse | null;
  status: string;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
}
const initialState: initialStateType = {
  data: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      console.log("state.token");
      state.isAuthenticated = true;
      const localStorageToken = localStorage.getItem("token");
      const parsedToken = localStorageToken && JSON.parse(localStorageToken);
      state.token = parsedToken;
    },
    Logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      location.reload();
    },
    resetState: (state) => {
      (state.data = null),
        (state.status = "idle"),
        (state.error = null),
        (state.isAuthenticated = false),
        (state.token = null);
    },
  },
});

export const selectAllSignindata = (state: RootState) => state.login.data;
export const selectUserToken = (state: RootState) => state.login.token;
export const selectAllSigninStatus = (state: RootState) => state.login.status;
export const selectAllSigninError = (state: RootState) => state.login.error;
export const selectAllAuthenticated = (state: RootState) =>
  state.login.isAuthenticated;
export const { setAuthenticated, Logout, resetState } = authSlice.actions;
export default authSlice.reducer;
