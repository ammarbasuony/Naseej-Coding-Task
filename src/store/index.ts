import { configureStore } from "@reduxjs/toolkit";

// Slices
import appSlice from "./slices/app.slice";
import chatSlice from "./slices/chat.slice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
