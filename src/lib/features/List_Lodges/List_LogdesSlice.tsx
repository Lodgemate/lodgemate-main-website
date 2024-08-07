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
      const { key, value } = action.payload;
      console.log(key, value)
      // Use the append method to add key-value pairs to the FormData object
      state.formData.set(key, value);
console.log(Object.fromEntries(state.formData))
      
    },
    appendStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
      const { key, value } = action.payload;
      console.log(key, value)
      // Use the append method to add key-value pairs to the FormData object
      state.formData.append(key, value);
console.log(Object.fromEntries(state.formData))
    },
    imagesSetStateItem: (state, action: PayloadAction<SetStateItemPayload>) => {
       const { key, value, index } = action.payload;
       console.log(key, value , index)
        if (index === 0 ) {
          console.log("yay")
      state.formData.set("coverphoto", value);
      console.log(Object.fromEntries(state.formData))

        }else{
          state.formData.append("photo", value);
      console.log(state.formData.getAll("photo"))
      console.log(Object.fromEntries(state.formData))
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
