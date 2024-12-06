import { RootState } from "@/lib/store";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  description: string;
  loading: boolean;
}

const initialState: InitialState = {
  loading: false,
  description: "",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload.loading;
      state.description = action.payload.description;
    },
  },
});

export const selectLoading = (state: RootState) => state.loader;
export const { setLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
