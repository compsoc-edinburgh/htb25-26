import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

export default function ReimbursementStep({
  needsReimbursement,
  setNeedsReimbursement,
  travel,
  setTravel,
  setStep,
}: {
  needsReimbursement?: boolean;
  setNeedsReimbursement: Dispatch<SetStateAction<boolean | undefined>>;
  travel?: string;
  setTravel: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "project",
      },
    ]);

    setStep("project");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        needsReimbursement: needsReimbursement,
        travellingFrom: travel,
      });

      updateSearchParam([
        {
          name: "step",
          value: "diet",
        },
      ]);

      setStep("diet");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label htmlFor="reimbursement">
          Will you need your travel reimbursed?
        </Label>
        <Tabs className="w-full" defaultValue={needsReimbursement ? "yes" : "no"}>
          <TabsList className="w-full">
            <TabsTrigger
              className="flex-1"
              value="yes"
              onClick={() => setNeedsReimbursement(true)}
            >
              Yes
            </TabsTrigger>
            <TabsTrigger
              className="flex-1"
              value="no"
              onClick={() => setNeedsReimbursement(false)}
            >
              No
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yes">
            <div className="flex flex-col gap-2 mt-6">
              <Label htmlFor="travel">
                Please provide details for your travel
              </Label>
              <Textarea
                name="travel"
                id="travel"
                defaultValue={travel}
                onChange={(e) => {
                  setTravel(e.target.value);
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="no"></TabsContent>
        </Tabs>
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
