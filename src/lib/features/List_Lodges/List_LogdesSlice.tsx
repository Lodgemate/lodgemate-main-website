import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListLodgeState {
  lodgeName: string;
  coverphoto: null | string;
  photos: string[];
  type: string;
  price: string;
  lodgeLocation: string;
  lodgeLocationDescription: string;
  location: any[];
  lodgeFeatures: string[];
  numberOfRooms: string;
}

// Define the shape of the payload for the setStateItem action
interface SetStateItemPayload {
  key: keyof ListLodgeState;
  value: any;
}

const initialState: ListLodgeState = {
  lodgeName: "",
  coverphoto: null,
  photos: [],
  type: "",
  price: "",
  lodgeLocation: "",
  lodgeLocationDescription: "",
  location: [],
  lodgeFeatures: [],
  numberOfRooms: "",
};

const List_LodgeSlice = createSlice({
  name: 'List_lodge',
  initialState,
  reducers: {
    setStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const selectAllList_Lodgesdata = (state: RootState) => state.List_Logdes;

export const { setStateItem } = List_LodgeSlice.actions;
export default List_LodgeSlice.reducer;
