import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetStateItemPayload {
  key: string;
  value: any;
  index?: number;
}

interface ListingState {
  formData: FormData;
  imagesUrl: string[] | [];
}
const initialState: ListingState = {
  formData: new FormData(),
  imagesUrl: [],
};

const ListingSlice = createSlice({
  name: "List_lodge",
  initialState,
  reducers: {
    setStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;
      console.log({key,value})
      state.formData.set(key, value);
    },
    appendStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;
      state.formData.append(key, value);
    },
    imagesSetStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value, index } = action.payload;
      if (index === 0) {
        state.formData.set("coverphoto", value);
      } else {
        state.formData.append("photos", value);
      }
    },
    setImagesUrl: (state, action: PayloadAction<string[] | []>) => {
      state.imagesUrl = action.payload;
    },
    resetFormData: (state) => {
      state.formData = new FormData();
      state.imagesUrl = [];
      console.log(state);
    },
  },
});
export const selectAllList_Listingdata = (state: RootState) =>
  state.List_Logdes.formData;
export const selectAllList_imagesUrl = (state: RootState) =>
  state.List_Logdes.imagesUrl;

export const {
  setStateItem,
  appendStateItem,
  imagesSetStateItem,
  setImagesUrl,
  resetFormData,
} = ListingSlice.actions;
export default ListingSlice.reducer;
