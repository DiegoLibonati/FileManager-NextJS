import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/redux/features/user/userSlice";
import alertSlice from "@/redux/features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});
