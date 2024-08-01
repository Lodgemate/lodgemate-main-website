/**
 * Manages the state and async actions related to fetching services data.
 * @param {string} fetchUrl - The URL to fetch the services data from.
 * @param {AbortSignal} signal - The signal to abort the fetch request.
 * @returns The fetched services data or an error message.
 */
import { RootState } from "@/lib/store";
import { ServiceApiResponse } from "@/lib/Types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const controller = new AbortController();

const initialState = {
  data:  null as ServiceApiResponse | null,
  status: "idle",
  error: null,
};

export const Fetchservices = createAsyncThunk(
  "services",
  async (fetchUrl: string, { signal }: { signal: AbortSignal }) => {
    const controller = new AbortController();
    
    try {
      // Pass the signal to the fetch request
      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

const serviceSlice = createSlice({
  name: "lodge/Slice",
  initialState,
  reducers: {
    setservicesData:(state,action)=>{
      state.data= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Fetchservices.pending, (state) => { 
        state.status = "loading";
      })
      .addCase(Fetchservices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(Fetchservices.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});


export const selectAllFetchservicesdata = (state: RootState) => state.services.data;
export const selectAllFetchservicesStatus = (state: RootState) => state.services.status;
export const selectAllFetchservicesError = (state: RootState) => state.services.error;
 export const { setservicesData } = serviceSlice.actions;
export default serviceSlice.reducer;
