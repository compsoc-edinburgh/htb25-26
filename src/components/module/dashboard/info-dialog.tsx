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
  meal1: z.string().min(1, "First meal selection is required"),
  meal2: z.string().min(1, "Second meal selection is required"),
  pizza: z.string().min(1, "Pizza selection is required"),
  meal3: z.string().min(1, "Third meal selection is required"),
  agreedToPolicy: z.boolean().refine((val) => val, {
    message: "You must agree to the policies to continue",
  }),
});

type InfoFormValues = z.infer<typeof infoSchema>;

interface InfoDialogProps {
  user: {
    dietary_restrictions?: string | null;
    shirt_size?: string | null;
    food_choice_1?: string | null;
    food_choice_2?: string | null;
    pizza_choice?: string | null;
    food_choice_3?: string | null;
  };
}

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const MEAL1_OPTIONS = [
  { value: "Beef Burrito Bowl", label: "Beef Burrito Bowl" },
  { value: "Chicken Burrito Bowl", label: "Chicken Burrito Bowl" },
  { value: "Pork Burrito Bowl", label: "Pork Burrito Bowl" },
  {
    value: "Vegan Chilli + Grilled Vegetables",
    label: "Vegan Chilli + Grilled Vegetables",
  },
];

const MEAL2_OPTIONS = [
  { value: "Lasagna", label: "Lasagna" },
  { value: "Penne Arrabbiata", label: "Penne Arrabbiata (vg)" },
  { value: "Tagliatelle al Pollo", label: "Tagliatelle al Pollo (chicken)" },
];

const PIZZA_OPTIONS = [
  { value: "Margherita", label: "Margherita" },
  { value: "Pepperoni", label: "Pepperoni" },
  { value: "Aubergine (vg)", label: "Aubergine (vg)" },
  { value: "Wild Mushroom (vg)", label: "Wild Mushroom (vg)" },
  { value: "Buttermilk Chicken", label: "Buttermilk Chicken" },
];

const MEAL3_OPTIONS = [
  { value: "Salmon", label: "Salmon" },
  { value: "Yellowfin", label: "Yellowfin" },
  { value: "Prawn", label: "Prawn" },
  { value: "Tofu (vg)", label: "Tofu (vg)" },
  { value: "Chicken katsu", label: "Chicken katsu" },
  { value: "Salmon teriyaki", label: "Salmon teriyaki" },
];

export default function InfoDialog({ user }: InfoDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(
    !user.dietary_restrictions ||
      !user.shirt_size ||
      !user.food_choice_1 ||
      !user.food_choice_2 ||
      !user.pizza_choice ||
      !user.food_choice_3
  );

  const form = useForm<InfoFormValues>({
    resolver: zodResolver(infoSchema),
    mode: "onChange",
    defaultValues: {
      dietaryRestrictions: user.dietary_restrictions ?? "",
      shirtSize: user.shirt_size ?? "",
      meal1: user.food_choice_1 ?? "",
      meal2: user.food_choice_2 ?? "",
      pizza: user.pizza_choice ?? "",
      meal3: user.food_choice_3 ?? "",
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
      meal1: data.meal1,
      meal2: data.meal2,
      pizza: data.pizza,
      meal3: data.meal3,
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
        </DialogHeader>

        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs text-red-700">
                Please confirm by{" "}
                <span className="font-semibold">
                  11:59 PM, Sunday 12 October 2025 (UK time)
                </span>{" "}
                to secure your spot.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="dietary-restrictions" className="text-xs">
              Dietary Restrictions <span className="text-red-600">*</span>
            </Label>
            <Textarea
              id="dietary-restrictions"
              placeholder="Please list any dietary restrictions, allergies, or preferences (e.g., vegetarian, vegan, gluten-free, nut allergy). If none, please write 'None'."
              className={
                errors.dietaryRestrictions
                  ? "border-red-500 text-xs"
                  : "text-xs"
              }
              rows={4}
              {...register("dietaryRestrictions")}
            />
          </div>

          <div className="space-y-1.5">
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
                      errors.shirtSize ? "border-red-500 text-xs" : "text-xs"
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
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meal1" className="text-xs">
              First Meal - Tortilla <span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              name="meal1"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="meal1"
                    className={
                      errors.meal1 ? "border-red-500 text-xs" : "text-xs"
                    }
                  >
                    <SelectValue placeholder="Select your first meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEAL1_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meal2" className="text-xs">
              Second Meal - Pasta <span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              name="meal2"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="meal2"
                    className={
                      errors.meal2 ? "border-red-500 text-xs" : "text-xs"
                    }
                  >
                    <SelectValue placeholder="Select your second meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEAL2_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pizza" className="text-xs">
              Midnight Pizza <span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              name="pizza"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="pizza"
                    className={
                      errors.pizza ? "border-red-500 text-xs" : "text-xs"
                    }
                  >
                    <SelectValue placeholder="Select your pizza" />
                  </SelectTrigger>
                  <SelectContent>
                    {PIZZA_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meal3" className="text-xs">
              Third Meal - Soul Sushi <span className="text-red-600">*</span>
            </Label>
            <Controller
              control={control}
              name="meal3"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="meal3"
                    className={
                      errors.meal3 ? "border-red-500 text-xs" : "text-xs"
                    }
                  >
                    <SelectValue placeholder="Select your third meal" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEAL3_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-sm"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <div className="flex items-center space-x-3 pb-5">
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
                className="cursor-pointer text-xs font-normal leading-tight text-zinc-500"
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
              </Label>
            </div>
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
