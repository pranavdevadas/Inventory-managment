import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import adminAuthReducer from './slice/adminAuthSlice'
import { apiSlice } from "./slice/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
