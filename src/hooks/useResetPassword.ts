import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .max(64, "Password cannot exceed 64 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*()_+=\-[\]{}|;:'",.<>/?]/,
        "Password must contain at least one special character.",
      ),
    confirmPassword: z.string().min(1, "Confirmation Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const useResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    try {
      console.log("Password reset successfully", data);

      setIsSuccess(true);
    } catch (error) {
      console.error("Failed to reset password:", error);
    }
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
    isSuccess,
    isSubmitting,
  };
};
