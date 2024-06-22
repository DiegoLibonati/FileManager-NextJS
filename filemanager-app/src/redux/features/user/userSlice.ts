import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../../../next-env";

const INITIAL_STATE: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
