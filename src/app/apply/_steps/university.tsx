import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Country } from "~/components/ui/country-dropdown";
import { Label } from "~/components/ui/label";
import { University } from "~/components/ui/university-dropdown";

import universities from "~/lib/constants/world_universities_and_domains.json";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { Button } from "~/components/ui/button";
import { UniversitySelectlist } from "~/components/ui/university-selectlist";

export default function UniversityStep({
  country,
  university,
  setUniversity,
  setStep,
}: {
  country: Country;
  university?: University;
  setUniversity: Dispatch<SetStateAction<University | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "country",
      },
    ]);

    setStep("country");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        university: university?.name,
      });

      updateSearchParam([
        {
          name: "step",
          value: "university-year",
        },
      ]);

      setStep("university-year");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-1 flex-col justify-between gap-3"
    >
      <div className="flex flex-col gap-3">
        <div className="rounded-xl bg-muted p-4">
          <h2 className="text-xl font-medium">Your university</h2>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <UniversitySelectlist
          options={universities.filter(
            (u) => u.alpha_two_code == country.alpha2,
          )}
          defaultValue={university?.name}
          onChange={(u) => setUniversity(u)}
        />
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={!university?.name || loading}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
