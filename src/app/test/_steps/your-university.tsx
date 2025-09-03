import { Control, Controller } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Country, CountrySelectlist } from "~/components/ui/country-selectlist";
import {
  University,
  UniversitySelectlist,
} from "~/components/ui/university-selectlist";
import universities from "~/lib/constants/world_universities_and_domains.json";
import { countries } from "country-data-list";
import { FormValues } from "./types";

const yearOptions = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "msc", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
];

interface YourUniversityProps {
  control: Control<FormValues>;
  register: any;
  getValues: any;
}

export const YourUniversity = ({
  control,
  register,
  getValues,
}: YourUniversityProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Where is your university based?
          </Label>
        </div>
        <Controller
          control={control}
          name="countryAlpha3"
          render={({ field }) => (
            <CountrySelectlist
              defaultValue={field.value}
              onChange={(c: Country) => field.onChange(c.alpha3)}
            />
          )}
        />
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Your university</Label>
        </div>
        <Controller
          control={control}
          name="universityName"
          render={({ field }) => (
            <UniversitySelectlist
              options={universities.filter(
                (u) =>
                  u.alpha_two_code ===
                  countries.all.find(
                    (c: any) => c.alpha3 === getValues("countryAlpha3")
                  )?.alpha2
              )}
              defaultValue={field.value}
              onChange={(u: University) => field.onChange(u.name)}
            />
          )}
        />
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Which year are you in?</Label>
        </div>
        <Controller
          control={control}
          name="universityYear"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">University email</Label>
        </div>
        <Input
          type="email"
          placeholder="john.doe@university.ac.uk"
          {...register("universityEmail")}
        />
      </div>
    </div>
  );
};
