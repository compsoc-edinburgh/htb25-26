import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

export default function ProjectStep({
  project,
  setProject,
  setStep,
}: {
  project?: string;
  setProject: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "hackathons",
      },
    ]);

    setStep("hackathons");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        projectDescription: project,
      });

      updateSearchParam([
        {
          name: "step",
          value: "reimbursement",
        },
      ]);

      setStep("reimbursement");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleContinue}
      className="flex h-full flex-col justify-between gap-3"
    >
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Project</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about a completed project, the technologies you used, and any links you can send us. 
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <Textarea
          name="project"
          id="project"
          className="h-full resize-none"
          autoFocus
          defaultValue={project}
          onChange={(e) => {
            setProject(e.target.value);
          }}
        />
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
