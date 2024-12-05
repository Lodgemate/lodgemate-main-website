import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

interface SearchResult {
  lodges: { id: number | string; lodgeName: string }[];
  cities: { id: number | string; address: string }[];
}

const data: SearchResult = {
  lodges: [{ id: 1, lodgeName: "" }],
  cities: [{ id: 1, address: "" }],
};

const initialState = {
  data: data,
};

const lodgeSlice = createSlice({
  name: "lodge/Slice",
  initialState,
  reducers: {
    setLodgesData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const selectAllFetchLodgesdata = (state: RootState) => state.lodges.data;
export const { setLodgesData } = lodgeSlice.actions;
export default lodgeSlice.reducer;
