import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import alertSlice from "./features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});
