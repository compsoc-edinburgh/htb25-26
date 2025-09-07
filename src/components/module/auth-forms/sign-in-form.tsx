"use client";

import React from "react";
import { toast } from "sonner";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useSignIn } from "@clerk/nextjs";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInValues = z.infer<typeof SignInSchema>;

interface SignInFormProps extends Omit<HTMLMotionProps<"form">, "onSubmit"> {
  onSubmit: (values: SignInValues) => Promise<void>;
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
  variants: any;
  transition: any;
}

export function SignInForm({
  onSubmit,
  onForgotPassword,
  onSwitchToSignUp,
  variants,
  transition,
  ...props
}: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({ resolver: zodResolver(SignInSchema) });
  const { signIn, isLoaded } = useSignIn();

  const handleFormSubmit = async (values: SignInValues) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "An unknown error occurred";
      const code: string | undefined = error?.errors?.[0]?.code;
      if (
        code === "form_identifier_not_found" ||
        code === "identifier_not_found"
      ) {
        setError("email", { type: "server", message });
      } else if (
        code === "form_password_incorrect" ||
        code === "incorrect_password" ||
        code === "form_password_length_too_short"
      ) {
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            data-error={errors.email ? "true" : undefined}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-errormessage={errors.email ? "email-error" : undefined}
            {...register("email")}
            required
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          />
          {errors.email && (
            <span
              id="email-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-xs text-zinc-500 underline-offset-4 hover:underline"
              onClick={onForgotPassword}
              disabled={isSubmitting}
            >
              Forgot your password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            data-error={errors.password ? "true" : undefined}
            aria-invalid={errors.password ? "true" : undefined}
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-errormessage={errors.password ? "password-error" : undefined}
            {...register("password")}
            required
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          />
          {errors.password && (
            <span
              id="password-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {errors.password.message as string}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-white px-2 text-xs text-zinc-600">
            Or Sign in with Google
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          className="flex w-full items-center gap-2 text-xs"
          disabled={!isLoaded}
          aria-disabled={!isLoaded}
          onClick={() =>
            signIn?.authenticateWithRedirect({
              strategy: "oauth_google",
              redirectUrl: "/signin/sso-callback",
              redirectUrlComplete: "/",
            })
          }
          loading={!isLoaded}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Google
        </Button>
        <p className="w-full text-center text-xs text-zinc-500">
          DON&apos;T HAVE AN ACCOUNT?{" "}
          <button
            type="button"
            className="text-black underline"
            onClick={onSwitchToSignUp}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            SIGN UP
          </button>
        </p>
      </div>
    </motion.form>
  );
}
