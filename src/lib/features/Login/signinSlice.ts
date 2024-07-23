import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { createAsyncThunk, createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { Endpoints } from "@/services/Api/endpoints";
const signInurl = Endpoints.signIn;
interface initialStateType{
  data: ApiResponse | null ,
  status: string,
  error: string|null,
  isAuthenticated: boolean,
  token:string | null
}
const initialState: initialStateType = {
  data: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
  token:null
};

export const Signin = createAsyncThunk(
  "Auth/SignIn",
  async (credentials) => {
    try {
      console.log(credentials);
      console.log(signInurl);
      const response = await fetch(signInurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
        body: JSON.stringify(credentials),
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
      return error.message;
    }
  }
);

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setAuthenticated:(state)=>{
      console.log("state.token")
      state.isAuthenticated = true;
      const localStorageToken=localStorage.getItem("token")
      const parsedToken=localStorageToken && JSON.parse(localStorageToken)
      state.token = parsedToken
      console.log(state.token)
    },
    Logout:(state)=>{
      state.isAuthenticated = false;
      localStorage.removeItem("token")
    },
    resetState:(state)=>{
      state.data = null,
      state.status= "idle",
      state.error= null,
      state.isAuthenticated= false,
      state.token=null
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(Signin.pending, (state) => { 
        state.status = "loading";
      })
      .addCase(Signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(Signin.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});


export const selectAllSignindata = (state: RootState) => state.login.data;
export const selectAllSigninStatus = (state: RootState) => state.login.status;
export const selectAllSigninError = (state: RootState) => state.login.error;
export const { setAuthenticated, Logout, resetState } = authSlice.actions;
export default authSlice.reducer;
