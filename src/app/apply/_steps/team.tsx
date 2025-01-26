"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import CreateTeam from "./create-team";
import JoinTeam from "./join-team";
import { Team } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();
  const { updateSearchParam } = useSearchParamsHelper();

  const [joined, setJoined] = useState(false);
  const [tab, setTab] = useState<"individual" | "create" | "join">(
    team ? (team.created_by === user?.id ? "create" : "join") : "individual",
  );

  if (!joined && team) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team {team?.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-8">
          <CardDescription>
            You have already{" "}
            {team.created_by === user?.id ? "created" : "joined"} the team{" "}
            {team?.name}. You can continue with your application.
          </CardDescription>
          <div>
            <Button
              variant={"secondary"}
              onClick={() => {
                updateSearchParam([{ name: "step", value: "name" }]);
                setApplicationType("individual");
                setStep("name");
              }}
            >
              Don't want to join as a team?
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => {
              updateSearchParam([{ name: "step", value: "name" }]);

              setApplicationType("team");
              setStep("name");
            }}
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    );
  }

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
          <TabsTrigger disabled={joined} value="individual">
            Individual
          </TabsTrigger>
          <TabsTrigger disabled={joined} value="create">
            Create a team
          </TabsTrigger>
          <TabsTrigger disabled={joined} value="join">
            Join a team
          </TabsTrigger>
        </TabsList>
        <TabsContent value="individual">
          <Card>
            <Button
              className="w-full"
              onClick={() => {
                updateSearchParam([{ name: "step", value: "name" }]);

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
            setJoined={setJoined}
          />
        </TabsContent>
        <TabsContent value="join">
          <JoinTeam
            team={team}
            setTeam={setTeam}
            setApplicationType={setApplicationType}
            setStep={setStep}
            setJoined={setJoined}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
