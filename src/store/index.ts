import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import editorReducer from "./slices/editorSlice";
import slidesReducer from "./slices/slidesSlice";
import elementsReducer from "./slices/elementsSlice";
import clipboardReducer from "./slices/clipboardSlice";
import { errorMiddleware } from "./middleware/errorMiddleware";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    editor: editorReducer,
    slides: slidesReducer,
    elements: elementsReducer,
    clipboard: clipboardReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, errorMiddleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
