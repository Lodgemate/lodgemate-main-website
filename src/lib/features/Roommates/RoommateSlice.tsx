/**
 * Manages the state and async actions related to fetching roommate data.
 * @param {string} fetchUrl - The URL to fetch the roommate data from.
 * @param {AbortSignal} signal - The signal to abort the fetch request.
 * @returns The fetched roommate data or an error message.
 */
import { RootState } from "@/lib/store";
import { RoommatesResponse } from "@/lib/Types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const controller = new AbortController();

/**
 * Initial state object for a service API response.
 * @property {RoommatesResponse | null} data - The data received from the API response.
 * @property {string} status - The status of the API call, default is "idle".
 * @property {null} error - Any error that occurred during the API call, default is null.
 */
const initialState = {
  data:  null as RoommatesResponse | null,
  status: "idle",
  error: null,
};

/**
 * Fetches data from the specified URL using the GET method and returns the parsed response.
 * @param {string} fetchUrl - The URL to fetch data from.
 * @param {AbortSignal} signal - The signal object used to abort the fetch operation.
 * @returns The parsed response data if successful, or an error message if an error occurs.
 */
export const Fetchroommate = createAsyncThunk(
  "roommate",
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

/**
 * Creates a slice for managing the 'lodge/Slice' state in the Redux store.
 * @param {Object} config - Configuration object for creating the slice.
 * @param {string} config.name - The name of the slice.
 * @param {Object} config.initialState - The initial state of the slice.
 * @param {Object} config.reducers - Reducer functions to handle state updates.
 * @param {Function} config.extraReducers - Additional reducer functions for handling async actions.
 * @returns A Redux slice object for managing 'lodge/Slice' state.
 */
const serviceSlice = createSlice({
  name: "lodge/Slice",
  initialState,
  reducers: {
    setroommateData:(state,action)=>{
      state.data= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Fetchroommate.pending, (state) => { 
        state.status = "loading";
      })
      .addCase(Fetchroommate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(Fetchroommate.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});


/**
 * Selects all the fetched roommate data from the Redux state.
 * @param {RootState} state - The root state of the Redux store.
 * @returns The roommate data from the state.
 */
export const selectAllFetchroommatedata = (state: RootState) => state.roommate.data;
export const selectAllFetchroommateStatus = (state: RootState) => state.roommate.status;
export const selectAllFetchroommateError = (state: RootState) => state.roommate.error;
 export const { setroommateData } = serviceSlice.actions;
export default serviceSlice.reducer;
