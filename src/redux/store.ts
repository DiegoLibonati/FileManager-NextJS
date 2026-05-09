import { configureStore } from "@reduxjs/toolkit";

import userSlice from "@/redux/features/user/userSlice";
import alertSlice from "@/redux/features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
