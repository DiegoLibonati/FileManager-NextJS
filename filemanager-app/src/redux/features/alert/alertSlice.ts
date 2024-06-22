import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AlertState, Alert } from "@/app/lib/entities";

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
      state.type = action.payload?.type;
      state.message = action.payload?.message;
      state.open = action.payload?.open;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export default alertSlice.reducer;
