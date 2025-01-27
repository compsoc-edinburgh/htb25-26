"use client";

import { Team, User } from "@prisma/client";
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
import { useSearchParamsHelper } from "~/lib/helpers";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function JoinTeam({
  team,
  setTeam,
  setJoined,
}: {
  team?: Team & { members?: User[] };
  setTeam: Dispatch<
    SetStateAction<
      | (Team & {
          members?: User[];
        })
      | undefined
    >
  >;
  setJoined: Dispatch<SetStateAction<boolean>>;
}) {
  const { user } = useUser();

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

      setTeam({
        ...res,
        members: [
          {
            id: user?.id ?? "",
            email: user?.primaryEmailAddress?.toString() ?? "",
            first_name: user?.firstName ?? "",
            last_name: user?.lastName ?? "",
            created_by: res.id,
            created_at: new Date(),
            placements_count: "",
            hackathons_count: "",
            dietary_restrictions: "",
            project_description: "",
            pronouns: "",
            country: "",
            university_name: "",
            university_year: "",
            university_email: "",
            cv_url: "",
            updated_at: new Date(),
            updated_by: res.id,
            team_id: res.id,
            calendar_email: "",
            portfolio_url: "",
            needs_reimbursement: false,
            travelling_from: "",
          },
        ],
      });

      toast.success("Successfully joined team " + res.name);
    } catch (e) {
      if (e instanceof Error && e.message === "NOTFOUND") {
        setErrors(["No team was found. Make sure you have the right code."]);
      } else {
        console.error(e);
      }
    }

    setLoading(false);
  };

  if (team) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team {team.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p className="text-green-400">
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
