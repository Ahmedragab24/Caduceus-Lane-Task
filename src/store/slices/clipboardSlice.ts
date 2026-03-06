import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlideElement } from "../../types/editor";

interface ClipboardState {
  element: SlideElement | null;
}

const initialState: ClipboardState = {
  element: null,
};

export const clipboardSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    copyToClipboard: (state, action: PayloadAction<SlideElement>) => {
      state.element = action.payload;
    },
    clearClipboard: (state) => {
      state.element = null;
    },
  },
});

export const { copyToClipboard, clearClipboard } = clipboardSlice.actions;
export default clipboardSlice.reducer;
