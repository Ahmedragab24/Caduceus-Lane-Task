import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface AppState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  isLoading: boolean;
  toasts: Toast[];
}

const initialState: AppState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  sidebarOpen: true,
  isLoading: false,
  toasts: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      state.toasts.push({
        ...action.payload,
        id: Date.now().toString(),
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
});

export const {
  toggleTheme,
  setSidebarOpen,
  setLoading,
  addToast,
  removeToast,
} = appSlice.actions;

export default appSlice.reducer;
