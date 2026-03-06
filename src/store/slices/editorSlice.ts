import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditorState {
  activeSlideId: string | null;
  selectedElementId: string | null;
}

const initialState: EditorState = {
  activeSlideId: "1",
  selectedElementId: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setActiveSlide: (state, action: PayloadAction<string>) => {
      state.activeSlideId = action.payload;
      state.selectedElementId = null;
    },
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },
    clearSelection: (state) => {
      state.selectedElementId = null;
    },
  },
});

export const { setActiveSlide, selectElement, clearSelection } =
  editorSlice.actions;

export default editorSlice.reducer;
