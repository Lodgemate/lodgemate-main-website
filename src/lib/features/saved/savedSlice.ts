import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Endpoints } from "@/services/Api/endpoints";
import { FetchApi } from "@/utils/Fetchdata";
import {
  createAsyncThunk,
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import { selectToken } from "../Auth/tokenSlice";

const initialState = {
  data: null,
  savedLodges: [],
  savedServices: [],
  savedRoommates: [],
  status: "idle",
  error: null,
};
const url = Endpoints.addToWishlist;

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state) => {},
  },
});

const selectSelf = (state: RootState) => state.wishlist;

export const selectWishlist = createSelector(
  [selectSelf],
  (state) => state.data
);

export const { setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
