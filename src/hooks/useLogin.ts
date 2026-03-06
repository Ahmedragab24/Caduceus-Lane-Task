import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/endpoints/auth";
import toast from "react-hot-toast";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password is too long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[!@#$%^&*()_+=\-[\]{}|;:'",.<>/?]/,
      "Password must contain at least one special character.",
    ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginApi, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginApi(data).unwrap();
      dispatch(loginSuccess(response.token));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};
