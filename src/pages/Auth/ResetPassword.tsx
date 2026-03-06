import CustomInput from "../../components/ui/CustomInput";
import CustomCard from "../../components/ui/CustomCard";
import SubmitBtn from "../../components/ui/SubmitBtn";
import { useResetPassword } from "../../hooks/useResetPassword";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../../components/ui/SuccessModal";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { register, onSubmit, errors, isSuccess, isSubmitting } =
    useResetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <CustomCard title="Reset Password">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="animate-fade-in-up delay-100">
            <CustomInput
              label="New Password"
              type="password"
              placeholder="••••••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
          </div>

          <div className="animate-fade-in-up delay-200">
            <CustomInput
              label="Confirm New Password"
              type="password"
              placeholder="••••••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div className="animate-fade-in-up delay-300">
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/login")}
              disabled={isSubmitting}
              className="font-bold! px-0"
            >
              Back to Login
            </Button>
          </div>

          <div className="animate-fade-in-up delay-400 mt-2">
            <SubmitBtn type="submit" isLoading={isSubmitting}>
              Reset Password
            </SubmitBtn>
          </div>
        </form>
      </CustomCard>

      <SuccessModal
        isOpen={isSuccess}
        onClose={() => navigate("/login")}
        title="Success!"
        message="Your password has been successfully reset. You can now log in with your new password."
      />
    </div>
  );
};

export default ResetPassword;
