import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { useSearchParamsHelper } from "~/lib/helpers";
import { ApplicationStep } from "../application-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Team } from "@prisma/client";

export default function ReviewAndSubmitStep({
  team,
  applicationType,
  setStep,
}: {
  team?: Team | null;
  applicationType: "individual" | "team";
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const router = useRouter();
  const { updateSearchParam } = useSearchParamsHelper();

  const apply = api.application.create.useMutation();

  const [loading, setLoading] = useState(false);

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "cv",
      },
    ]);

    setStep("cv");
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await apply.mutateAsync({
        type: applicationType,
        team_id: applicationType === "team" ? team?.id : undefined,
      });

      router.push("/dashboard/application");
    } catch (err: any) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div>
      Review
      <CardDescription className="text-sm text-gray-500">
        Please review your application before submitting.
      </CardDescription>
      <div className="flex w-full justify-center gap-3 py-10">
        <Button variant={"outline"} onClick={handleBack} type="button">
          Back
        </Button>
        <Button
          className="w-full flex-1"
          onClick={handleSubmit}
          loading={loading}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
