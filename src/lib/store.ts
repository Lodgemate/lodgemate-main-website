import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
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

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "User", "token", "login"], // Reducers to persist
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

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// Export types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Setup listeners for API cache invalidation
setupListeners(store.dispatch);
