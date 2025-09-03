import { Control } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { FormValues } from "./types";

interface AboutYourselfProps {
  control: Control<FormValues>;
  register: any;
}

export const AboutYourself = ({ register }: AboutYourselfProps) => {
  return (
    <div className="grid gap-6">
      <div>
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">What is your name?</Label>
        </div>
        <div className="grid max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" {...register("firstName")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" {...register("lastName")} />
          </div>
        </div>
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Pronouns (optional)</Label>
        </div>
        <Input
          id="pronouns"
          placeholder="e.g. they/them, she/her, he/him"
          {...register("pronouns")}
        />
      </div>
    </div>
  );
};
