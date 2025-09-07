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

const ResetSchema = z.object({
  password: z.string().min(6),
  code: z.string().min(1),
});

export type ResetValues = z.infer<typeof ResetSchema>;

interface ResetPasswordFormProps
  extends Omit<HTMLMotionProps<"form">, "onSubmit"> {
  onSubmit: (values: ResetValues) => Promise<void>;
  variants: any;
  transition: any;
}

export function ResetPasswordForm({
  onSubmit,
  variants,
  transition,
  ...props
}: ResetPasswordFormProps) {
  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(ResetSchema),
  });

  const handleFormSubmit = async (values: ResetValues) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      const message =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Failed to reset";
      const code: string | undefined = error?.errors?.[0]?.code;
      if (
        code === "form_code_incorrect" ||
        code === "verification_code_invalid"
      ) {
        resetForm.setError("code", { type: "server", message });
      } else if (code?.includes("password")) {
        resetForm.setError("password", { type: "server", message });
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <motion.form
      onSubmit={resetForm.handleSubmit(handleFormSubmit)}
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
          <Label htmlFor="password" className="text-sm font-medium">
            New password
          </Label>
          <Input
            id="password"
            type="password"
            aria-invalid={
              resetForm.formState.errors.password ? "true" : undefined
            }
            aria-describedby={
              resetForm.formState.errors.password
                ? "reset-password-error"
                : undefined
            }
            aria-errormessage={
              resetForm.formState.errors.password
                ? "reset-password-error"
                : undefined
            }
            data-error={
              resetForm.formState.errors.password ? "true" : undefined
            }
            {...resetForm.register("password")}
          />
          {resetForm.formState.errors.password && (
            <span
              id="reset-password-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {resetForm.formState.errors.password.message as string}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code" className="text-sm font-medium">
            Reset code
          </Label>
          <Input
            id="code"
            type="text"
            placeholder="Check your email"
            aria-invalid={resetForm.formState.errors.code ? "true" : undefined}
            aria-describedby={
              resetForm.formState.errors.code ? "reset-code-error" : undefined
            }
            aria-errormessage={
              resetForm.formState.errors.code ? "reset-code-error" : undefined
            }
            data-error={resetForm.formState.errors.code ? "true" : undefined}
            {...resetForm.register("code")}
          />
          {resetForm.formState.errors.code && (
            <span
              id="reset-code-error"
              role="alert"
              aria-live="polite"
              className="text-xs text-red-600"
            >
              {resetForm.formState.errors.code.message as string}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
          size="lg"
          loading={resetForm.formState.isSubmitting}
          disabled={resetForm.formState.isSubmitting}
        >
          Reset password
        </Button>
        {/* Non-field errors now use Sonner toasts */}
      </div>
    </motion.form>
  );
}
