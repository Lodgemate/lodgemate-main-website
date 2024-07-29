import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null as ApiResponse | null,
  status: "idle",
  error: null,
};
const url = Endpoints.getUsers;
export const getUsersData = createAsyncThunk("usersData", async () => {
  const tokenStorage = localStorage.getItem("token");
  try {
    if (tokenStorage) {
      const token = JSON.parse(tokenStorage);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Cache-Control": "public, max-age=3600",
        },
      });
      const parsedRes = await response.json();
      console.log(parsedRes);
      if (parsedRes) {
        return parsedRes;
      }
    }
  } catch (error: any) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsersData.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectAllUsersdata = (state: RootState) => state.User.data;
export const selectAllUsersStatus = (state: RootState) => state.User.status;
export const selectAllUsersError = (state: RootState) => state.User.error;
// export const { setAuthenticated, Logout, resetState } = authSlice.actions;
export default userSlice.reducer;
