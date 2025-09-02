import { configureStore } from "@reduxjs/toolkit";

import userSlice from "@src/redux/features/user/userSlice";
import alertSlice from "@src/redux/features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    alert: alertSlice,
  },
});
