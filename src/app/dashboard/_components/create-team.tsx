"use client";

import { useUser } from "@clerk/nextjs";
import { Team, User } from "@prisma/client";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
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
import { api } from "~/trpc/react";

export default function CreateTeam({
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
  const createTeam = api.team.create.useMutation();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const teamName = formData.get("teamName") as string;

    try {
      const newTeam = await createTeam.mutateAsync({
        teamName,
      });

      setTeam({
        ...newTeam,
        members: [
          {
            id: user?.id ?? "",
            email: user?.primaryEmailAddress?.toString() ?? "",
            first_name: user?.firstName ?? "",
            last_name: user?.lastName ?? "",
            created_by: newTeam.id,
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
            updated_by: newTeam.id,
            team_id: newTeam.id,
            calendar_email: "",
            portfolio_url: "",
            needs_reimbursement: false,
            travelling_from: "",
          },
        ],
      });
      toast.success("Team created successfully.");
    } catch (err: any) {
      toast.error("There was something wrong, please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  if (team) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Team {team.name}</CardTitle>
          <p>
            Your team has been created. Share the code with your friends to
            invite them to join.
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-2">
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
        <CardTitle>Create a new team</CardTitle>
        <CardDescription>
          Create your own team and invite your friends to join.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="teamName"
              defaultValue=""
              name="teamName"
              placeholder="Autobots"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" loading={loading}>
            Create
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
