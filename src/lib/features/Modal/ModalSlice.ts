import { RootState } from "@/lib/store"
import { createSlice } from "@reduxjs/toolkit"


const initialState={
    failedModalMssg: null,
    successfulModalMssg: null,
    loadingModalMssg: ""
}


const ModalSlice = createSlice({
    name:"Modal",
    initialState,
    reducers: {
            showSuccessfulModal:(state, action)=>{
                state.successfulModalMssg= action.payload
            },
            showLoadingModal:(state, action)=>{
                state.loadingModalMssg= action.payload
            },
            showFailedModal:(state, action)=>{
                state.failedModalMssg= action.payload
            }
    }
})

export const {showFailedModal, showLoadingModal, showSuccessfulModal}= ModalSlice.actions
export const selectAllfailedModalMssg = (state:RootState) => state.Modal.failedModalMssg
export const selectAllsuccessModalMssg = (state:RootState) => state.Modal.successfulModalMssg
export const selectAllloadingModalMssg = (state:RootState) => state.Modal.loadingModalMssg
export default ModalSlice.reducer;