import { RootState } from "@/lib/store"
import { createSelector, createSlice } from "@reduxjs/toolkit"


const initialState={
    failedModalMssg: null,
    successfulModalMssg: null,
    loadingModalMssg: null,
    emailOtpModal:null,
    delteModal:{
        deleteFunction: null,
        message: "",
      },
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
            },
            showDeleteModal:(state, action)=>{
                state.delteModal= action.payload
            },
    }
})
 const selectSelf =(state:RootState) => state.Modal

export const {showDeleteModal,showFailedModal, showLoadingModal, showSuccessfulModal, showEmailOtpModal}= ModalSlice.actions
export const selectAllfailedModalMssg = createSelector([selectSelf], 
    (state) => state.failedModalMssg)
export const selectAllsuccessModalMssg = createSelector([selectSelf], 
    (state) => state.successfulModalMssg)
export const selectAllloadingModalMssg = createSelector([selectSelf], 
    (state) => state.loadingModalMssg)
export const selectAllemailOtpModalModalMssg = createSelector([selectSelf], 
    (state) => state.emailOtpModal)
export const selectAlldeleteModalModalMssg = createSelector([selectSelf], 
    (state) => state.delteModal)
export default ModalSlice.reducer;