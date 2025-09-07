"use client";

import React from "react";
import { toast } from "sonner";
import { HTMLMotionProps, motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";

interface VerificationFormProps
  extends Omit<HTMLMotionProps<"form">, "onSubmit"> {
  onSubmit: (values: { code: string }) => Promise<void>;
  variants: any;
  transition: any;
}

export function VerificationForm({
  onSubmit,
  variants,
  transition,
  ...props
}: VerificationFormProps) {
  const verifyForm = useForm<{ code: string }>({ defaultValues: { code: "" } });
  const codeValue = verifyForm.watch("code");

  const handleFormSubmit = async (values: { code: string }) => {
    try {
      await onSubmit(values);
    } catch (error: any) {
      const msg =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        error?.message ||
        "Verification failed";
      const code: string | undefined = error?.errors?.[0]?.code;
      if (
        code === "form_code_incorrect" ||
        code === "verification_code_invalid"
      ) {
        verifyForm.setError("code", { type: "server", message: msg });
      } else {
        toast.error(msg);
      }
    }
  };

  return (
    <motion.form
      onSubmit={verifyForm.handleSubmit(handleFormSubmit)}
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
          <Label htmlFor="code" className="text-center">
            Verification code
          </Label>
          <Controller
            control={verifyForm.control}
            name="code"
            rules={{
              required: "Code is required",
              minLength: {
                value: 6,
                message: "Enter 6-digit code",
              },
            }}
            render={({ field }) => (
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  aria-label="Verification code"
                  aria-invalid={
                    verifyForm.formState.errors.code ? "true" : undefined
                  }
                  aria-describedby={
                    verifyForm.formState.errors.code
                      ? "verify-code-error"
                      : undefined
                  }
                >
                  <InputOTPGroup
                    className={
                      verifyForm.formState.errors.code
                        ? `rounded-md shadow-md ring-4 ring-red-500/20 [&>*]:border-red-500`
                        : ""
                    }
                  >
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {verifyForm.formState.errors.code && (
                  <span
                    id="verify-code-error"
                    role="alert"
                    aria-live="polite"
                    className="block max-w-sm text-center text-xs text-red-600"
                  >
                    {verifyForm.formState.errors.code.message as string}
                  </span>
                )}
              </div>
            )}
          />
        </div>
        <Button
          type="submit"
          loading={verifyForm.formState.isSubmitting}
          disabled={(codeValue?.length ?? 0) < 6}
          className="w-full"
        >
          Verify
        </Button>
      </div>
    </motion.form>
  );
}
