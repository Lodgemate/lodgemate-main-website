import { RootState } from "@/lib/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/signup`;
const initialState = {
  data: {},
  status: "idle",
  error: null,
};

export const SignUp = createAsyncThunk(
  "Auth/SignUp",
  async (formData) => {
    try {
      console.log(formData);
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "*",         
        },
        body: JSON.stringify(formData),
      });
      const parsedRes=await response.json()
       console.log(parsedRes.status);
       if (parsedRes.status === "fail") {
       console.log(parsedRes.message);

           throw (parsedRes || "Failed to sign up");
       }else{
       console.log(parsedRes);

        return parsedRes;
       }
    } catch (error: any) {
      console.log(error)
      return error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;

      })
      .addCase(SignUp.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || action.error.message;
      });
  },
});

export const selectAlldata = (state: RootState) => state.auth.data;
export const selectAllStatus = (state: RootState) => state.auth.status;
export const selectAllError = (state: RootState) => state.auth.error;
export default authSlice.reducer;
