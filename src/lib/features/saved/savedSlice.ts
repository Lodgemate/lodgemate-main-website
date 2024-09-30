import { RootState } from "@/lib/store";
import { ApiResponse } from "@/lib/Types";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";

const initialState = {
  data: null ,
  savedLodges:[],
  savedServices:[],
  savedRoommates:[],
  status: "idle",
  error: null,
};
const url = Endpoints.addToWishlist;

export const getSavedData = createAsyncThunk("savedData", async () => {
  const tokenStorage = localStorage.getItem("token");

 
 


  try {
    if (tokenStorage) {
      const token = JSON.parse(tokenStorage);
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res: any= await FetchApi(url, options)
    if (res.status === 'success') {
        console.log(res.data.wishlists)
        return res.data.wishlists;
      }
    }
  } catch (error: any) {
    console.log(error.message)
    return error.message;
  }
});

const savedSlice = createSlice({
  name: "Saved",
  initialState,
  reducers: {
    setSavedData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSavedData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSavedData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.savedLodges= action.payload.filter((ent: any)=> ent.type === 'lodge')
        state.savedRoommates= action.payload.filter((ent: any)=> ent.type === 'roommate')
        state.savedServices= action.payload.filter((ent: any)=> ent.type === 'service')
      })
      .addCase(getSavedData.rejected, (state: any, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});
const selectSelf = (state: RootState) => state.Saved;

export const selectAllSavedData = createSelector(
  [selectSelf],
  (state) => state.data
);
export const selectAllSavedLodges = createSelector(
  [selectSelf],
  (state) => state.savedLodges
);
export const selectAllSavedRoommates = createSelector(
  [selectSelf],
  (state) => state.savedRoommates
);
export const selectAllSavedServices = createSelector(
  [selectSelf],
  (state) => state.savedServices
);
export const selectAllSavedStatus = createSelector(
  [selectSelf],
  (state) => state.status
);
export const selectAllSavedError = createSelector(
  [selectSelf],
  (state) => state.error
);

export const { setSavedData } = savedSlice.actions;
export default savedSlice.reducer;
