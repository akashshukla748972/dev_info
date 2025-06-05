import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
