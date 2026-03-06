import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeToast } from "../../store/slices/appSlice";

const ReduxToastHandler = () => {
  const toasts = useAppSelector((state) => state.app.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.type === "success") {
        toast.success(t.message);
      } else if (t.type === "error") {
        toast.error(t.message);
      } else {
        toast(t.message);
      }

      // Cleanup toast from Redux after bridging to react-hot-toast
      dispatch(removeToast(t.id));
    });
  }, [toasts, dispatch]);

  return null;
};

export default ReduxToastHandler;
