import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UserFormValues } from "./types";

interface AboutYourselfProps {
  control: Control<UserFormValues>;
  errors: FieldErrors<UserFormValues>;
  disabled?: boolean;
}

export const AboutYourself = ({
  control,
  errors,
  disabled,
}: AboutYourselfProps) => {
  return (
    <div className="grid gap-6">
      <div>
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">What is your name?</Label>
        </div>
        <div className="grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name *</Label>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <Input id="firstName" disabled={disabled} {...field} />
              )}
            />
            {errors?.firstName?.message && (
              <p className="text-sm text-red-600">
                {String(errors.firstName.message)}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name *</Label>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <Input id="lastName" disabled={disabled} {...field} />
              )}
            />
            {errors?.lastName?.message && (
              <p className="text-sm text-red-600">
                {String(errors.lastName.message)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Pronouns *</Label>
        </div>
        <Controller
          control={control}
          name="pronouns"
          render={({ field }) => (
            <Input
              id="pronouns"
              placeholder="e.g. they/them, she/her, he/him"
              disabled={disabled}
              {...field}
            />
          )}
        />
        {errors?.pronouns?.message && (
          <p className="text-sm text-red-600">
            {String(errors.pronouns.message)}
          </p>
        )}
      </div>
    </div>
  );
};
