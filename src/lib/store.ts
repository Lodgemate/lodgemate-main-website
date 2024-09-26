import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./features/Auth/authSlice"
import loginReducer from "./features/Login/signinSlice"
import modalReducer from "./features/Modal/ModalSlice"
import userReducer from "./features/Users/usersSlice"
import lodgeReducer from "./features/Lodges/lodgesSlice"
import filterReducer from "./features/Filters/filterSlice"
import servicesReducer from "./features/Services/servicesSlice"
import roommateReducer from "./features/Roommates/RoommateSlice"
import Listing_Reducer from "./features/Listing/ListingSlice"
import ReviewReducers from "./features/Reviews/ReviewsSlice"
import SavedReducers from "./features/saved/savedSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      login: loginReducer,
      Modal: modalReducer,
      User: userReducer,
      lodges: lodgeReducer,
      filter: filterReducer,
      services: servicesReducer,
      roommate: roommateReducer,
      List_Logdes: Listing_Reducer,
      Reviews: ReviewReducers,
      Saved: SavedReducers
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']