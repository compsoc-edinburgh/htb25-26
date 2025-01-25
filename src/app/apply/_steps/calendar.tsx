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
import { useUser } from "@clerk/nextjs";

export default function CalendarStep({
  universityEmail,
  calendarEmail,
  setCalendarEmail,
  setStep,
}: {
  universityEmail?: string;
  calendarEmail?: string;
  setCalendarEmail: Dispatch<SetStateAction<string | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const { user } = useUser();

  const [tab, setTab] = useState<"yes" | "no">(
    calendarEmail !== undefined ? "yes" : "no",
  );
  const [loading, setLoading] = useState(false);

  const { updateSearchParam } = useSearchParamsHelper();
  const updateUser = api.user.update.useMutation();

  const handleBack = async () => {
    updateSearchParam([
      {
        name: "step",
        value: "diet",
      },
    ]);

    setStep("diet");
  };

  const handleContinue = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser.mutateAsync({
        calendarEmail: calendarEmail,
      });

      updateSearchParam([
        {
          name: "step",
          value: "review",
        },
      ]);

      setStep("review");
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
      <div className="rounded-xl bg-muted p-4">
        <h2 className="text-xl font-medium">Update your calendar</h2>
        <p className="text-sm text-muted-foreground">
          Would you like to be added to our joint calendar?
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Tabs className="w-full" defaultValue={tab}>
          <TabsList className="w-full">
            <TabsTrigger
              className="flex-1"
              value="yes"
              onClick={() => setTab("yes")}
            >
              Yes
            </TabsTrigger>
            <TabsTrigger
              className="flex-1"
              value="no"
              onClick={() => {
                setTab("no");
                setCalendarEmail(undefined);
              }}
            >
              No
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yes">
            <div className="mt-6 flex flex-col gap-2">
              <Label htmlFor="travel">Which email should we use?</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  size={"sm"}
                  type="button"
                  variant={"secondary"}
                  onClick={() =>
                    setCalendarEmail(user?.primaryEmailAddress?.toString())
                  }
                >
                  Use {user?.primaryEmailAddress?.toString()}
                </Button>
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  type="button"
                  onClick={() => setCalendarEmail(universityEmail)}
                >
                  Use {universityEmail}
                </Button>
              </div>
              <Input
                name="travel"
                id="travel"
                value={calendarEmail}
                onChange={(e) => {
                  setCalendarEmail(e.target.value);
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="no"></TabsContent>
        </Tabs>
      </div>
      <div className="flex w-full gap-3">
        <Button onClick={handleBack} variant={"secondary"} type="button">
          Back
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="flex-1"
          disabled={loading || !tab}
        >
          Next
        </Button>
      </div>
    </form>
  );
}
