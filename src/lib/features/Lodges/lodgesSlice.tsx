import { RootState } from "@/lib/store";
import { ApiResponse,LodgesApiResponse } from "@/lib/Types";
import { createAsyncThunk, createSlice,PayloadAction  } from "@reduxjs/toolkit";
const controller = new AbortController();

const initialState = {
  data:  null as LodgesApiResponse | null,
  status: "idle",
  error: null,
};

export const FetchLodges = createAsyncThunk(
  "Auth/SignIn",
  async (fetchUrl: string, { signal }: { signal: AbortSignal }) => {
    const controller = new AbortController();
    
    try {
      // Pass the signal to the fetch request
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWNkNTgxOTY4ODM5YmRjYTYzOTdjNiIsImlhdCI6MTcyMjA2ODA3OSwiZXhwIjoxNzI0NjYwMDc5fQ.5lYgErj3aqtQrr18TiUYgx9aOmhOEXs3cy7uE6MkG1U"}`
        },
        signal: controller.signal,
      });

      // Check for abort error
      if (response.status === 0) {
        throw new Error("Fetch aborted");
      }

      const parsedRes=await response.json()
      if (parsedRes.status === "fail") {
      console.log(parsedRes.message);
          throw (parsedRes || "Failed to sign up");
      }else{
      console.log(parsedRes);
       return parsedRes;
      }
    } catch (error: any) {
      return error.message;
    }
  }
);

const lodgeSlice = createSlice({
  name: "login",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(FetchLodges.pending, (state) => { 
        state.status = "loading";
      })
      .addCase(FetchLodges.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(FetchLodges.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});


export const selectAllFetchLodgesdata = (state: RootState) => state.lodges.data;
export const selectAllFetchLodgesStatus = (state: RootState) => state.lodges.status;
export const selectAllFetchLodgesError = (state: RootState) => state.lodges.error;
// export const { setAuthenticated, Logout, resetState } = authSlice.actions;
export default lodgeSlice.reducer;
