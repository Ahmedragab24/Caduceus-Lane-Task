import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import Button from "./ui/Button";
import CustomImage from "./ui/Image";
import ConfirmDialog from "./ui/ConfirmDialog";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button size="icon" onClick={() => setIsDialogOpen(true)}>
        <CustomImage
          src="/Icons/logout.svg"
          width={8}
          height={8}
          className=""
        />
      </Button>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Log Out"
        message="Are you sure you want to log out of your account?"
        confirmLabel="Log Out"
        cancelLabel="Cancel"
        onConfirm={() => {
          setIsDialogOpen(false);
          dispatch(logout());
          navigate("/login");
        }}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default LogOut;
