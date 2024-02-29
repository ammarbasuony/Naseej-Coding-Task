import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
import { IUser } from "@/models/user.model";

export interface AppState {
  user: IUser | null;
}

const initialState: AppState = {
  user: null,
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = AppSlice.actions;
export default AppSlice.reducer;
