import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export default function PortfolioStep({
  portfolio,
  setPortfolio,
  setStep,
}: {
  portfolio?: string;
  setPortfolio: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "cv",
      },
    ]);

    setStep("cv");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      await updateUser.mutateAsync({
        portfolioUrl: portfolio,
      });

      updateSearchParam([
        {
          name: "step",
          value: "placements",
        },
      ]);

      setStep("placements");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="portfolio">Portfolio/LinkedIn</Label>
        <Input
          name="portfolio"
          id="portfolio"
          autoFocus
          defaultValue={portfolio}
          onChange={(e) => {
            setPortfolio(e.target.value);
          }}
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
