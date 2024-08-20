import { RootState } from "@/lib/store";
import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  Reviews: [],
  Replies: null,
};

const ReviewSlice = createSlice({
  name: "Review",
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.Reviews = action.payload;
    },
    setReplies: (state, action) => {
      state.Replies = action.payload;
    },
  },
});

const selectSelf = (state: RootState) => state.Reviews;
export const { setReviews, setReplies } = ReviewSlice.actions;
export const selectAllReviews = createSelector(
  [selectSelf],
  (state) => state.Reviews
);
export const selectAllReplies = createSelector(
  [selectSelf],
  (state) => state.Replies
);
export default ReviewSlice.reducer;
