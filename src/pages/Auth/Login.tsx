import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/ui/CustomInput";
import CustomCard from "../../components/ui/CustomCard";
import Button from "../../components/ui/Button";
import { useLogin } from "../../hooks/useLogin";
import SubmitBtn from "../../components/ui/SubmitBtn";

const Login = () => {
  const navigate = useNavigate();
  const { register, onSubmit, errors, isLoading } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <CustomCard title="Log in">
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="animate-fade-in-up delay-100">
            <CustomInput
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register("email")}
              disabled={isLoading}
            />
          </div>

          <div className="animate-fade-in-up delay-200">
            <CustomInput
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password")}
              disabled={isLoading}
            />
          </div>

          <div className="animate-fade-in-up delay-300">
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/reset-password")}
              disabled={isLoading}
              className="font-bold! px-0"
            >
              Forgot Password?
            </Button>
          </div>

          <div className="animate-fade-in-up delay-400 mt-2">
            <SubmitBtn
              type="submit"
              isLoading={isLoading}
              className="w-full text-xl"
            >
              Log in
            </SubmitBtn>
          </div>
        </form>
      </CustomCard>
    </div>
  );
};

export default Login;
