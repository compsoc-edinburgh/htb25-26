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
import { Team, User } from "@prisma/client";
import { ExternalLink, PartyPopper } from "lucide-react";
import { Label } from "~/components/ui/label";

export default function ReviewAndSubmitStep({
  user,
  applicationType,
  setStep,
}: {
  user: {
    first_name: string | undefined;
    last_name: string | undefined;
    email: string | undefined;
    country: string | undefined;
    university_name: string | undefined;
    university_year: string | undefined;
    team_id: string | undefined;
    cv_url: string | undefined;
    portfolio_url: string | undefined;
    placements_count: string | undefined;
    hackathons_count: string | undefined;
    project_description: string | undefined;
    needs_reimbursement: boolean | undefined;
    travelling_from: string | undefined;
    dietary_restrictions: string | undefined;
    calendar_email: string | undefined;
  };
  applicationType: "individual" | "team" | undefined;
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
        value: "calendar",
      },
    ]);

    setStep("calendar");
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!applicationType) {
      return;
    }

    try {
      await apply.mutateAsync({
        type: applicationType,
        team_id:
          applicationType === "team" ? (user?.team_id ?? undefined) : undefined,
      });

      router.push("/dashboard/application");
    } catch (err: any) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="rounded-xl bg-muted p-4">
        <h2 className="flex gap-2 text-xl font-medium">Almost done</h2>
        <p className="text-sm text-muted-foreground">
          Your details have been saved. You can now review your application and
          submit it.
        </p>
      </div>
      <div className="flex-1">
        <div className="max-h-[300px] overflow-y-auto">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col">
              <Label className="text-xs">Name</Label>
              <span>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Country</Label>
              <span>{user.country}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">University</Label>
              <span>{user.university_name}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">University level</Label>
              <span>
                {user.university_year === "phd"
                  ? "PhD"
                  : user.university_year === "msc"
                    ? "Masters"
                    : "Undergraduate"}
              </span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">CV</Label>
              <Button
                asChild
                className="w-max px-0 text-blue-600"
                variant={"link"}
              >
                <a href={user.cv_url} target="_blank" rel="noreferrer">
                  View <ExternalLink />
                </a>
              </Button>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Portfolio/LinkedIn</Label>
              <span>{user.portfolio_url}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Placements/internships</Label>
              <span>{user.placements_count}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Hackathons attended</Label>
              <span>{user.hackathons_count}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Project</Label>
              <span>{user.project_description}</span>
            </div>
            <div className="flex flex-col">
              <Label className="text-xs">Reimbursement</Label>
              <span>{user.needs_reimbursement ? "Yes" : "No"}</span>
            </div>
            {user.needs_reimbursement && (
              <div className="flex flex-col">
                <Label className="text-xs">Travel details</Label>
                <span>{user.travelling_from}</span>
              </div>
            )}
            <div className="flex flex-col">
              <Label className="text-xs">Joint calendar</Label>
              <span>{!!user.calendar_email ? "Yes" : "No"}</span>
            </div>
            {user.calendar_email && (
              <div className="flex flex-col">
                <Label className="text-xs">Calendar email</Label>
                <span>{user.calendar_email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center gap-3">
        <Button variant={"secondary"} onClick={handleBack} type="button">
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
