import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/Auth/authSlice"
import loginReducer from "./features/Login/signinSlice"
import modalReducer from "./features/Modal/ModalSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      login: loginReducer,
      Modal: modalReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']