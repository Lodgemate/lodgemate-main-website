import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the payload for the setStateItem action
interface SetStateItemPayload {
  key: string; // FormData keys are strings
  value: any;
  index?: number
}

interface ListLodgeState {
  formData: FormData;
  imagesUrl: string[] | []
}
const initialState: ListLodgeState = {
  formData: new FormData(),
  imagesUrl:[]
};

const List_LodgeSlice = createSlice({
  name: 'List_lodge',
  initialState,
  reducers: {
    setStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;      // Use the set method to add key-value pairs to the FormData object
      state.formData.set(key, value);      
    },
    appendStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;
      // Use the append method to add key-value pairs to the FormData object
      state.formData.append(key, value);
    },
    imagesSetStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
       const { key, value, index } = action.payload;
        if (index === 0 ) {
      state.formData.set("coverphoto", value);
        }else{
          state.formData.append("photos", value);
        }
    },  
    setImagesUrl: (state, action: PayloadAction<string[]| []>) => {
      state.imagesUrl= action.payload;
      
    },
    
  }
});
export const selectAllList_Lodgesdata = (state: RootState) => state.List_Logdes.formData;
export const selectAllList_imagesUrl = (state: RootState) => state.List_Logdes.imagesUrl;

export const { setStateItem,appendStateItem, imagesSetStateItem, setImagesUrl } = List_LodgeSlice.actions;
export default List_LodgeSlice.reducer;