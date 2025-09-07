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

const EmailSchema = z.object({ email: z.string().email() });
export type EmailValues = z.infer<typeof EmailSchema>;

interface ForgotPasswordFormProps
  extends Omit<HTMLMotionProps<"form">, "onSubmit"> {
  onSubmit: (values: EmailValues) => Promise<void>;
  onSwitchToSignIn: () => void;
  variants: any;
  transition: any;
  errors?: string;
}

export function ForgotPasswordForm({
  onSubmit,
  onSwitchToSignIn,
  variants,
  transition,
  errors,
  ...props
}: ForgotPasswordFormProps) {
  const emailForm = useForm<EmailValues>({
    resolver: zodResolver(EmailSchema),
  });

  const handleFormSubmit = async (values: EmailValues) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to send reset code";
      const code: string | undefined = error?.errors?.[0]?.code;
      if (
        code === "form_identifier_not_found" ||
        code === "identifier_not_found"
      ) {
        emailForm.setError("email", { type: "server", message });
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <motion.form
      onSubmit={emailForm.handleSubmit(handleFormSubmit)}
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
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            aria-invalid={emailForm.formState.errors.email ? "true" : undefined}
            aria-describedby={
              emailForm.formState.errors.email
                ? "forgot-email-error"
                : undefined
            }
            aria-errormessage={
              emailForm.formState.errors.email
                ? "forgot-email-error"
                : undefined
            }
            data-error={emailForm.formState.errors.email ? "true" : undefined}
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <span
              id="forgot-email-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {emailForm.formState.errors.email.message as string}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
          size="lg"
          loading={emailForm.formState.isSubmitting}
          disabled={emailForm.formState.isSubmitting}
        >
          Send reset code
        </Button>
        <div className="text-center text-sm text-zinc-500">
          Remember your password?{" "}
          <button
            type="button"
            className="text-zinc-900 underline underline-offset-4 hover:no-underline"
            onClick={onSwitchToSignIn}
            disabled={emailForm.formState.isSubmitting}
          >
            Sign in
          </button>
        </div>
        {/* Non-field errors now use Sonner toasts */}
      </div>
    </motion.form>
  );
}
