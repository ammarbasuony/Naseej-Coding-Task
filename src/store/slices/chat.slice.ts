import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Models
import { IMessage } from "@/models/message.model";

export interface ChatState {
  messages: IMessage[];
}

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
