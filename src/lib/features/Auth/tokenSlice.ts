// src/lib/features/Token/tokenSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { RootState } from "@/lib/store";
import storage from "redux-persist/lib/storage";

interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.token;

export default tokenSlice.reducer;
