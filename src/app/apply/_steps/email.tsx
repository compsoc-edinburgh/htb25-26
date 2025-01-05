import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { toast } from "sonner";

export default function EmailStep({
  email,
  setEmail,
  setStep,
}: {
  email?: string;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "name",
      },
    ]);

    setStep("name");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        universityEmail: email,
      });

      updateSearchParam([
        {
          name: "step",
          value: "country",
        },
      ]);

      setStep("country");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">University email</Label>
        <Input
          autoFocus
          name="email"
          id="email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
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
