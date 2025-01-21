import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { useSearchParamsHelper } from "~/lib/helpers";

export default function NameStep({
  setStep,
  firstName,
  lastName,
  setFirstName,
  setLastName,
}: {
  firstName?: string;
  lastName?: string;
  setFirstName: Dispatch<SetStateAction<string | undefined>>;
  setLastName: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();

  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "team",
      },
    ]);

    setStep("team");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        firstName,
        lastName,
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
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-col justify-between gap-6"
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="rounded-xl bg-muted p-4">
          <h2 className="text-xl font-medium">What is your name?</h2>
          <p className="text-sm text-muted-foreground">
            This will appear on your entry pass later.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 py-3">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              autoFocus
              invisible
              name="firstName"
              id="firstName"
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              invisible
              name="lastName"
              id="lastName"
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button loading={loading} type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  );
}
