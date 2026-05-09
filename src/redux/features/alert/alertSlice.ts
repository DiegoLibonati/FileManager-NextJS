import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { Alert } from "@/types/app";
import type { AlertState } from "@/types/states";

const INITIAL_STATE: AlertState = {
  type: "info",
  message: "",
  open: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: INITIAL_STATE,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.open = action.payload.open;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
