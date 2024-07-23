import { RootState } from "@/lib/store"
import { createSlice } from "@reduxjs/toolkit"


const initialState={
    failedModalMssg: null,
    successfulModalMssg: null,
    loadingModalMssg: null,
    emailOtpModal:null
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
            },
            showEmailOtpModal:(state, action)=>{
                state.emailOtpModal= action.payload
            }
    }
})

export const {showFailedModal, showLoadingModal, showSuccessfulModal, showEmailOtpModal}= ModalSlice.actions
export const selectAllfailedModalMssg = (state:RootState) => state.Modal.failedModalMssg
export const selectAllsuccessModalMssg = (state:RootState) => state.Modal.successfulModalMssg
export const selectAllloadingModalMssg = (state:RootState) => state.Modal.loadingModalMssg
export const selectAllemailOtpModalModalMssg = (state:RootState) => state.Modal.emailOtpModal
export default ModalSlice.reducer;