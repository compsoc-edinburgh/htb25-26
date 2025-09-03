import { Control, Controller } from "react-hook-form";
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
import { UploadDropzone } from "~/components/uploadthing";
import { FormValues } from "./types";

const countOptions = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4+", label: "4 or more" },
];

interface YourWorkExperienceProps {
  control: Control<FormValues>;
  register: any;
}

export const YourWorkExperience = ({
  control,
  register,
}: YourWorkExperienceProps) => {
  return (
    <div className="grid gap-6">
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Your CV</Label>
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
                  className="ut-button:bg-zinc-900 ut-button:text-white ut-button:transition-colors ut-button:after:bg-zinc-900 ut-button:focus-within:ring-2 ut-button:focus-within:ring-ring hover:ut-button:bg-zinc-900/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 focus-visible:ut-button:ring-ring ut-button:focus-visible:ring-offset-2 ut-label:hover:text-primary ut-button:ut-uploading:bg-zinc-400/30"
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
          <Label className="font-whyte text-xl">Portfolio or LinkedIn</Label>
        </div>
        <Input placeholder="https://" {...register("portfolioUrl")} />
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Internships/placements completed
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
      </div>
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Hackathons attended</Label>
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
      </div>
      <div className="grid max-w-xl gap-4">
        <div className="flex flex-col gap-2">
          <div className="my-5 flex items-center gap-2">
            <Label className="font-whyte text-xl">Project aim</Label>
          </div>
          <Textarea rows={2} {...register("projectAim")} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="my-5 flex items-center gap-2">
            <Label className="font-whyte text-xl">Tech stack</Label>
          </div>
          <Textarea rows={2} {...register("projectStack")} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="my-5 flex items-center gap-2">
            <Label className="font-whyte text-xl">Project link</Label>
          </div>
          <Input placeholder="https://" {...register("projectLink")} />
        </div>
      </div>
    </div>
  );
};
