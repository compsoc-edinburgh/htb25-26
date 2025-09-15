import { type Control, type FieldErrors } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UserFormValues } from "./types";

interface AboutYourselfProps {
  control?: Control<any>;
  register: any;
  errors: FieldErrors<UserFormValues>;
  disabled?: boolean;
}

export const AboutYourself = ({
  register,
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
            <Input
              id="firstName"
              disabled={disabled}
              {...register("firstName")}
            />
            {errors?.firstName?.message && (
              <p className="text-sm text-red-600">
                {String(errors.firstName.message)}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name *</Label>
            <Input
              id="lastName"
              disabled={disabled}
              {...register("lastName")}
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
        <Input
          id="pronouns"
          placeholder="e.g. they/them, she/her, he/him"
          disabled={disabled}
          {...register("pronouns")}
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
