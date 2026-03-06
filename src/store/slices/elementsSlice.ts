import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { SlideElement, ElementType } from "../../types/editor";

interface ElementsState {
  byId: Record<string, SlideElement>;
  allIds: string[];
}

const initialState: ElementsState = {
  byId: {},
  allIds: [],
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<SlideElement[]>) => {
      state.byId = {};
      state.allIds = [];
      action.payload.forEach((el) => {
        state.byId[el.id] = el;
        state.allIds.push(el.id);
      });
    },
    addElement: (
      state,
      action: PayloadAction<Partial<SlideElement> & { type: ElementType }>,
    ) => {
      const newId = uuidv4();
      const maxZ = Object.values(state.byId).reduce(
        (max, el) => Math.max(max, el.z || 0),
        0,
      );

      const newEl: SlideElement = {
        id: newId,
        type: action.payload.type,
        x: action.payload.x || 50,
        y: action.payload.y || 50,
        z: action.payload.z || maxZ + 1,
        width: action.payload.width || 200,
        height:
          action.payload.height ||
          (action.payload.type === "text" ? "auto" : 200),
        content:
          action.payload.content ||
          (action.payload.type === "text"
            ? "Type here"
            : "https://via.placeholder.com/200"),
      };
      state.byId[newId] = newEl;
      state.allIds.push(newId);
    },
    updateElement: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<SlideElement> }>,
    ) => {
      if (state.byId[action.payload.id]) {
        state.byId[action.payload.id] = {
          ...state.byId[action.payload.id],
          ...action.payload.updates,
        };
      }
    },
    deleteElement: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
  },
});

export const { setElements, addElement, updateElement, deleteElement } =
  elementsSlice.actions;
export default elementsSlice.reducer;
