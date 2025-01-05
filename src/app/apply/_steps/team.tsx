"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateTeam from "./create-team";
import JoinTeam from "./join-team";
import { Team } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";

export default function TeamStep({
  team,
  setApplicationType,
  setTeam,
  setStep,
}: {
  team?: Team;
  setApplicationType: Dispatch<
    SetStateAction<"individual" | "team" | undefined>
  >;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
}) {
  const { updateSearchParam } = useSearchParamsHelper();

  const [tab, setTab] = useState<"individual" | "create" | "join">(
    "individual",
  );

  return (
    <div>
      <Label>Team</Label>
      <p className="text-sm text-muted-foreground">
        You can apply as an individual or as part of a team.
      </p>
      <Tabs
        defaultValue={tab}
        className="w-full py-3"
        onValueChange={(t) => setTab(t as typeof tab)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="create">Create a team</TabsTrigger>
          <TabsTrigger value="join">Join a team</TabsTrigger>
        </TabsList>
        <TabsContent value="individual">
          <Card>
            <Button
              className="w-full"
              onClick={() => {
                updateSearchParam([
                  { name: "type", value: "individual" },
                  { name: "step", value: "name" },
                ]);

                setApplicationType("individual");
                setStep("name");
              }}
            >
              Continue with individual application
            </Button>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <CreateTeam
            team={team}
            setTeam={setTeam}
            setApplicationType={setApplicationType}
            setStep={setStep}
          />
        </TabsContent>
        <TabsContent value="join">
          <JoinTeam
            setTeam={setTeam}
            setApplicationType={setApplicationType}
            setStep={setStep}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
