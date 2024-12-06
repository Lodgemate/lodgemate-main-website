import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  location: string | null;
  price: number | null;
  sr: number;
  query: null | string;
}

const initialState: InitialState = {
  location: null,
  price: null,
  sr: 20,
  query: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      console.log(action.payload);
      state.location = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setSr: (state, action) => {
      state.sr = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const selectAllLocationFilter = (state: RootState) =>
  state.filter.location;
export const selectAllPriceFilter = (state: RootState) => state.filter.price;
export const selectAllSrFilter = (state: RootState) => state.filter.sr;
export const selectAllQueryFilter = (state: RootState) => state.filter.query;
export const { setLocation, setPrice, setSr, setSearchQuery } =
  filterSlice.actions;

export default filterSlice.reducer;
