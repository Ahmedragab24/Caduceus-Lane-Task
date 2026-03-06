import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { addToast } from "../slices/appSlice";

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMsg =
      (action.payload as any)?.data?.message || "An unexpected error occurred";

    store.dispatch(
      addToast({
        message: errorMsg,
        type: "error",
      }),
    );
  }

  return next(action);
};
