import { Label } from "~/components/ui/label";
import { Country, CountryDropdown } from "~/components/ui/country-dropdown";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useSearchParamsHelper } from "~/lib/helpers";
import { ApplicationStep } from "../application-form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { countries } from "country-data-list";

export default function CountryStep({
  country,
  setCountry,
  setStep,
}: {
  country?: Country;
  setCountry: Dispatch<SetStateAction<Country | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  useEffect(() => {
    if (!country) {
      setCountry(countries.all.find((c) => c.alpha3 === "GBR"));
    }
  }, []);

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "email",
      },
    ]);

    setStep("email");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        country: country?.alpha2,
      });

      updateSearchParam([
        {
          name: "step",
          value: "university",
        },
      ]);

      setStep("university");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="country">Country</Label>
        <CountryDropdown
          defaultValue={country?.alpha3 ?? "GBR"}
          onChange={(c) => setCountry(c)}
        />
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"outline"} type="button">
          Back
        </Button>
        <Button loading={loading} type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  );
}
