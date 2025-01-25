"use client";

import { Team } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { ApplicationStep } from "../application-form";
import { useSearchParamsHelper } from "~/lib/helpers";

export default function JoinTeam({
  team,
  setTeam,
  setApplicationType,
  setStep,
  setJoined,
}: {
  team?: Team;
  setTeam: Dispatch<SetStateAction<Team | undefined>>;
  setApplicationType: Dispatch<
    SetStateAction<"individual" | "team" | undefined>
  >;
  setStep: Dispatch<SetStateAction<ApplicationStep>>;
  setJoined: Dispatch<SetStateAction<boolean>>;
}) {
  const { updateSearchParam } = useSearchParamsHelper();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const joinTeam = api.team.join.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await joinTeam.mutateAsync({
        team_code: code,
      });

      setTeam(res);
      setJoined(true);
    } catch (e) {
      if (e instanceof Error && e.message === "NOTFOUND") {
        setErrors(["No team was found. Make sure you have the right code."]);
      } else {
        console.error(e);
      }
    }

    setLoading(false);
  };

  const handleContinue = () => {
    updateSearchParam([{ name: "step", value: "name" }]);

    setApplicationType("team");
    setStep("name");
  };

  if (team) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team {team.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className=" text-green-400">
            Successfully joined team {team.name}.{" "}
          </p>
          <p className="font-sans text-sm text-muted-foreground">
            You can invite up to 3 more friends to join your team by sharing the
            code below with them.
          </p>
          <div className="my-3 flex items-center space-x-2">
            <Label>Team code:</Label>
            <span className="font-bold">{team.code}</span>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button onClick={() => handleContinue()}>Continue</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join a team</CardTitle>
        <CardDescription>
          Ask your friends for their team code and join their team.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="code">Team code</Label>
            <Input
              id="code"
              defaultValue=""
              onChange={(e) => setCode(e.target.value)}
              placeholder="XJSYY"
              className={cn(
                "w-full uppercase",
                errors.length
                  ? "border-destructive ring-4 ring-destructive/30"
                  : "",
              )}
            />
            {!!errors.length && (
              <ul className="px-2 py-1">
                {errors.map((error) => (
                  <li key={error} className="text-sm text-destructive">
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" loading={loading}>
            Join
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
