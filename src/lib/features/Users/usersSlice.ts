import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";

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
console.log("data")

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
  reducers: {
    setUserData:(state,action)=>{
      state.data = action.payload
    }
  },
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
const selectSelf =(state:RootState) => state.User

export const selectAllUsersdata = createSelector([selectSelf],(state) => state.data);
export const selectAllUsersStatus = createSelector([selectSelf],(state) => state.status);
export const selectAllUsersError = createSelector([selectSelf],(state) => state.error);

 export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
