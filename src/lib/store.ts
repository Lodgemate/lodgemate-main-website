import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./features/Auth/authSlice";
import loginReducer from "./features/Login/signinSlice";
import modalReducer from "./features/Modal/ModalSlice";
import userReducer from "./features/Users/usersSlice";
import lodgeReducer from "./features/Lodges/lodgesSlice";
import filterReducer from "./features/Filters/filterSlice";
import servicesReducer from "./features/Services/servicesSlice";
import roommateReducer from "./features/Roommates/RoommateSlice";
import Listing_Reducer from "./features/Listing/ListingSlice";
import ReviewReducers from "./features/Reviews/ReviewsSlice";
import SavedReducers from "./features/saved/savedSlice";
import tokenReducer from "./features/Auth/tokenSlice";

// Configure persist settings
const persistConfig = {
  key: "root", // Key for local storage
  storage, // Storage engine to use
  whitelist: ["auth", "User", "token", "login"],
};

// Combine reducers
const rootReducer = combineReducers({
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
  Saved: SavedReducers,
  token: tokenReducer,
});

// Apply persistReducer to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
  });
};

// Set up persistor
export const persistor = persistStore(makeStore());

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
