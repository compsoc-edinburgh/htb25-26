"use client";

import React from "react";
import { toast } from "sonner";
import { HTMLMotionProps, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

const AccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AccountValues = z.infer<typeof AccountSchema>;

interface SignUpFormProps extends Omit<HTMLMotionProps<"form">, "onSubmit"> {
  onSubmit: (values: AccountValues) => Promise<void>;
  onSwitchToSignIn: () => void;
  signUpLoaded: boolean;
  variants: any;
  transition: any;
}

export function SignUpForm({
  onSubmit,
  onSwitchToSignIn,
  signUpLoaded,
  variants,
  transition,
  ...props
}: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AccountValues>({ resolver: zodResolver(AccountSchema) });

  const handleFormSubmit = async (values: AccountValues) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Something went wrong";
      // Try to map common clerk error to the right field; default to root
      const code: string | undefined = error?.errors?.[0]?.code;
      const field =
        code === "form_password_pwned" ||
        code === "form_password_length_too_short"
          ? "password"
          : code === "form_identifier_exists"
            ? "email"
            : undefined;
      if (field === "email") {
        setError("email", { type: "server", message });
      } else if (field === "password") {
        setError("password", { type: "server", message });
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      {...props}
    >
      <div className="grid w-full gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email address
          </Label>
          <span className="font-sans text-xs text-zinc-500">
            You&apos;ll need your university email to apply
          </span>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            data-error={errors.email ? "true" : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            aria-errormessage={errors.email ? "signup-email-error" : undefined}
            className="border-gray-200 focus:border-black focus:ring-black"
            {...register("email")}
            required
          />
          {errors.email && (
            <span
              id="signup-email-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            className="border-gray-200 focus:border-black focus:ring-black"
            data-error={errors.password ? "true" : undefined}
            aria-invalid={errors.password ? "true" : undefined}
            aria-describedby={
              errors.password ? "signup-password-error" : undefined
            }
            aria-errormessage={
              errors.password ? "signup-password-error" : undefined
            }
            {...register("password")}
            required
          />
          {errors.password && (
            <span
              id="signup-password-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {errors.password.message as string}
            </span>
          )}
        </div>
        <div className="flex justify-center">
          <div id="clerk-captcha"></div>
        </div>
        <Button
          type="submit"
          size="lg"
          className="w-full bg-black text-white hover:bg-gray-800"
          loading={isSubmitting}
          disabled={!signUpLoaded}
        >
          Continue
        </Button>
        <p className="w-full text-center text-xs text-zinc-500">
          ALREADY HAVE AN ACCOUNT?{" "}
          <button
            type="button"
            className="text-black underline"
            onClick={onSwitchToSignIn}
          >
            SIGN IN
          </button>
        </p>
      </div>
    </motion.form>
  );
}
