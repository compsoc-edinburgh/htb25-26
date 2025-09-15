import { Control, Controller, type FieldErrors } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { ApplicationFormValues } from "./types";

interface PreferencesProps {
  control: Control<ApplicationFormValues>;
  register: any;
  watch: any;
  errors?: FieldErrors<ApplicationFormValues>;
}

export const Preferences = ({
  control,
  register,
  watch,
  errors,
}: PreferencesProps) => {
  return (
    <div className="grid gap-6">
      <div className="mb-5 flex max-w-md flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Will you need travel reimbursed *
          </Label>
        </div>
        <p className="text-sm text-gray-600">
          We offer travel reimbursement for students traveling from outside
          Edinburgh. Full details will be provided upon acceptance.
        </p>
        <Controller
          control={control}
          name="needsReimbursement"
          render={({ field }) => (
            <div className="flex gap-2">
              <Button
                type="button"
                variant={field.value ? "default" : "secondary"}
                onClick={() => field.onChange(true)}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={!field.value ? "default" : "secondary"}
                onClick={() => field.onChange(false)}
                className="flex-1"
              >
                No
              </Button>
            </div>
          )}
        />
        {errors?.needsReimbursement?.message && (
          <p className="text-sm text-red-600">
            {String(errors.needsReimbursement.message)}
          </p>
        )}
      </div>
      {watch("needsReimbursement") === true && (
        <div className="flex max-w-xl flex-col gap-2">
          <div className="my-5 flex items-center gap-2">
            <Label className="font-whyte text-xl">
              Where are you travelling from *
            </Label>
          </div>
          <Textarea
            rows={4}
            placeholder="e.g. Edinburgh, Glasgow, Manchester, etc."
            {...register("travellingFrom")}
          />
          {errors?.travellingFrom?.message && (
            <p className="text-sm text-red-600">
              {String(errors.travellingFrom.message)}
            </p>
          )}
        </div>
      )}
      <div className="flex max-w-xl flex-col gap-2">
        <div className="my-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Which email should we use for event communications?
          </Label>
        </div>
        <Input
          type="email"
          placeholder="john.doe@gmail.com"
          {...register("calendarEmail")}
        />
        {errors?.calendarEmail?.message && (
          <p className="text-sm text-red-600">
            {String(errors.calendarEmail.message)}
          </p>
        )}
      </div>
    </div>
  );
};
