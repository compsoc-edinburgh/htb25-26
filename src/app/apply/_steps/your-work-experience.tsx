import {
  Control,
  Controller,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { UploadDropzone } from "~/components/module/uploadthing";
import { ApplicationFormValues } from "./types";

const countOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4 or more" },
];

interface YourWorkExperienceProps {
  control: Control<ApplicationFormValues>;
  register: UseFormRegister<ApplicationFormValues>;
  errors?: FieldErrors<ApplicationFormValues>;
}

export const YourWorkExperience = ({
  control,
  register,
  errors,
}: YourWorkExperienceProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Your CV *</Label>
        </div>
        <Controller
          control={control}
          name="cvUrl"
          render={({ field }) => (
            <div className="flex flex-col gap-3">
              {field.value ? (
                <div className="flex items-center gap-3 text-black">
                  <Button asChild className="flex-1">
                    <a href={field.value} target="_blank" rel="noreferrer">
                      View uploaded CV
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => field.onChange("")}
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <UploadDropzone
                  className="border-1 rounded-none border-solid border-zinc-300 bg-zinc-50/30 uppercase transition-colors hover:border-zinc-400 hover:bg-zinc-50/50 ut-button:rounded-none ut-button:border ut-button:border-black ut-button:bg-black ut-button:px-6 ut-button:py-3 ut-button:text-xs ut-button:font-medium ut-button:uppercase ut-button:text-white ut-button:transition-all ut-button:hover:bg-zinc-800 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 ut-button:focus-visible:ring-black ut-button:focus-visible:ring-offset-2 ut-allowed-content:text-xs ut-allowed-content:text-zinc-500 ut-label:text-sm ut-label:font-normal ut-label:text-zinc-700"
                  endpoint="pdfUploader"
                  onClientUploadComplete={(res: any) =>
                    field.onChange(res?.[0]?.url)
                  }
                  onUploadError={() => {}}
                />
              )}
            </div>
          )}
        />
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Portfolio or LinkedIn *</Label>
        </div>
        <Input placeholder="https://" {...register("portfolioUrl")} />
        {errors?.portfolioUrl?.message && (
          <p className="text-sm text-red-600">
            {String(errors.portfolioUrl.message)}
          </p>
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            How many computer science/tech internships/placements have you
            completed since beginning university *
          </Label>
        </div>
        <Controller
          control={control}
          name="placementsCount"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of placements" />
              </SelectTrigger>
              <SelectContent>
                {countOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.placementsCount?.message && (
          <p className="text-sm text-red-600">
            {String(errors.placementsCount.message)}
          </p>
        )}
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            How many hackathons have you attended *
          </Label>
        </div>
        <Controller
          control={control}
          name="hackathonsCount"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select number of hackathons" />
              </SelectTrigger>
              <SelectContent>
                {countOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.hackathonsCount?.message && (
          <p className="text-sm text-red-600">
            {String(errors.hackathonsCount.message)}
          </p>
        )}
      </div>
      <div className="grid max-w-xl gap-4">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Please briefly describe a project you&apos;ve completed in the
            following format:
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-whyte text-lg">Project aim</Label>
          <Textarea
            rows={2}
            placeholder="Short answer describing the aim of your project"
            {...register("projectAim")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-whyte text-lg">Project tech stack</Label>
          <Textarea
            rows={2}
            placeholder="Short answer describing the technologies used"
            {...register("projectStack")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-whyte text-lg">Github link</Label>
          <Input
            placeholder="https://github.com/..."
            {...register("projectLink")}
          />
        </div>
      </div>
    </div>
  );
};
