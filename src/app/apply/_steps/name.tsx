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
          value: "email",
        },
      ]);

      setStep("email");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            autoFocus
            name="firstName"
            id="firstName"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            name="lastName"
            id="lastName"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex">
        <Button loading={loading} type="submit" className="flex-1">
          Next
        </Button>
      </div>
    </form>
  );
}
