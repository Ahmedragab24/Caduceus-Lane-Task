import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SlideData } from "../../types/editor";

interface SlidesState {
  items: SlideData[];
}

const initialState: SlidesState = {
  items: [
    {
      id: "1",
      name: "01_Slide_name_goas_here",
      thumbnailUrl: "/Images/background1.jpg",
      backgroundUrl: "/Images/background1.jpg",
    },
    {
      id: "2",
      name: "02_Slide_name_goas_here",
      thumbnailUrl: "/Images/background2.jpg",
      backgroundUrl: "/Images/background2.jpg",
    },
    {
      id: "3",
      name: "03_Slide_name_goas_here",
      thumbnailUrl: "/Images/background3.jpg",
      backgroundUrl: "/Images/background3.jpg",
    },
    {
      id: "4",
      name: "04_Slide_name_goas_here",
      thumbnailUrl: "/Images/background4.jpg",
      backgroundUrl: "/Images/background4.jpg",
    },
  ],
};

export const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {
    setSlides: (state, action: PayloadAction<SlideData[]>) => {
      state.items = action.payload;
    },
    updateSlide: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<SlideData> }>,
    ) => {
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
  },
});

export const { setSlides, updateSlide } = slidesSlice.actions;
export default slidesSlice.reducer;
