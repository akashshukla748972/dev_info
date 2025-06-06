import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice/authSlice";
import projectReducer from "./project_slice/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
  },
});
