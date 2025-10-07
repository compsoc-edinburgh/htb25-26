"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

const infoSchema = z.object({
  dietaryRestrictions: z
    .string()
    .min(1, "Dietary restrictions are required")
    .trim(),
  shirtSize: z.string().min(1, "T-shirt size is required"),
  agreedToPolicy: z.boolean().refine((val) => val, {
    message: "You must agree to the policies to continue",
  }),
});

type InfoFormValues = z.infer<typeof infoSchema>;

interface InfoDialogProps {
  user: {
    dietary_restrictions?: string | null;
    shirt_size?: string | null;
  };
}

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function InfoDialog({ user }: InfoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(
    !user.dietary_restrictions || !user.shirt_size
  );

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    mode: "onChange",
    defaultValues: {
      dietaryRestrictions: user.dietary_restrictions ?? "",
      shirtSize: user.shirt_size ?? "",
      agreedToPolicy: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Information saved successfully!");
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to save information. Please try again.");
      console.error(error);
    },
  });

  const onSubmit = async (data: InfoFormValues) => {
    updateUser.mutate({
      dietaryRestrictions: data.dietaryRestrictions,
      shirtSize: data.shirtSize,
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        closeButton={false}
        className="sm:max-w-[500px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">
            Complete Your Information
          </DialogTitle>
          <DialogDescription className="text-sm">
            Before accessing your dashboard, please provide the following
            required information.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xs font-semibold text-red-800">
                Confirmation Deadline
              </h3>
              <p className="mt-1 text-xs text-red-700">
                Please confirm by{" "}
                <span className="font-semibold">
                  11:59 PM, Sunday 12 October 2025 (UK time)
                </span>{" "}
                to secure your spot. If you don't complete this by the deadline,
                your application will be automatically rejected.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="dietary-restrictions" className="text-xs">
              Dietary Restrictions <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="dietary-restrictions"
              placeholder="Please list any dietary restrictions, allergies, or preferences (e.g., vegetarian, vegan, gluten-free, nut allergy). If none, please write 'None'."
              className={
                errors.dietaryRestrictions
                  ? "border-red-500 text-sm"
                  : "text-sm"
              }
              rows={4}
              {...register("dietaryRestrictions")}
            />
            {errors.dietaryRestrictions && (
              <p className="text-xs text-red-600">
                {errors.dietaryRestrictions.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="shirt-size" className="text-xs">
              T-Shirt Size <span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              name="shirtSize"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="shirt-size"
                    className={
                      errors.shirtSize ? "border-red-500 text-sm" : "text-sm"
                    }
                  >
                    <SelectValue placeholder="Select your t-shirt size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TSHIRT_SIZES.map((size) => (
                      <SelectItem key={size} value={size} className="text-sm">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.shirtSize && (
              <p className="text-xs text-red-600">{errors.shirtSize.message}</p>
            )}
          </div>

          <div className="space-y-3 rounded-md border border-zinc-200 bg-zinc-50 p-4">
            <div className="flex items-center space-x-3">
              <Controller
                control={control}
                name="agreedToPolicy"
                render={({ field }) => (
                  <Checkbox
                    id="policy-agreement"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={errors.agreedToPolicy ? "border-red-500" : ""}
                  />
                )}
              />
              <Label
                htmlFor="policy-agreement"
                className="cursor-pointer text-xs font-normal leading-tight"
              >
                I confirm that I will participate in HackTheBurgh and I agree to
                the{" "}
                <a
                  href="/documents/HTB-Code-of-Conduct.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-black"
                >
                  Code of Conduct
                </a>
                ,{" "}
                <a
                  href="/documents/HTB-Privacy-Policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-black"
                >
                  Privacy Policy
                </a>
                , and{" "}
                <a
                  href="/documents/HTB-Rules.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-black"
                >
                  Rules
                </a>
                . <span className="text-red-600">*</span>
              </Label>
            </div>

            {errors.agreedToPolicy && (
              <p className="text-xs text-red-600">
                {errors.agreedToPolicy.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full text-sm"
              loading={isSubmitting || updateUser.isPending}
              disabled={isSubmitting || updateUser.isPending}
            >
              Save Information
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
