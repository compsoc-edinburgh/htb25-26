import {
  type Control,
  type FieldErrors,
  Controller,
  useForm,
} from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { ApplicationFormValues } from "./types";

const CreateTeamSchema = z.object({
  teamName: z
    .string()
    .min(1, "Team name is required")
    .max(50, "Team name must be 50 characters or less"),
});

const JoinTeamSchema = z.object({
  joinCode: z
    .string()
    .min(5, "Team code must be 5 characters")
    .max(5, "Team code must be 5 characters"),
});

type CreateTeamValues = z.infer<typeof CreateTeamSchema>;
type JoinTeamValues = z.infer<typeof JoinTeamSchema>;

interface TeamProps {
  control: Control<ApplicationFormValues>;
  register: any;
  errors: FieldErrors<ApplicationFormValues>;
  setValue: (name: keyof ApplicationFormValues, value: any) => void;
}

export const Team = ({ setValue, register, errors }: TeamProps) => {
  const getUserTeam = api.team.getUserTeam.useQuery();
  const createTeam = api.team.create.useMutation();
  const joinTeam = api.team.join.useMutation();
  const leaveTeam = api.team.leave.useMutation();

  const [tab, setTab] = useState<"create" | "join">("create");
  const [joinErrors, setJoinErrors] = useState<string[]>([]);

  useEffect(() => {
    const team = getUserTeam.data;
    if (team) {
      setValue("teamId", team.id);
      setValue("type", "team");
    } else {
      setValue("teamId", undefined);
      setValue("type", "individual");
    }
  }, [getUserTeam.data, setValue]);

  const createForm = useForm<CreateTeamValues>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const joinForm = useForm<JoinTeamValues>({
    resolver: zodResolver(JoinTeamSchema),
    defaultValues: {
      joinCode: "",
    },
  });

  const handleCreate = async (data: CreateTeamValues) => {
    try {
      const newTeam = await createTeam.mutateAsync({
        teamName: data.teamName.trim(),
      });
      if (!newTeam) {
        toast.error("There was an error creating the team, please try again.");
        return;
      }
      toast.success(`Team ${newTeam.name} created successfully.`);
      await getUserTeam.refetch();

      createForm.reset();
    } catch (err) {
      console.error(err);
      toast.error("There was something wrong, please try again.");
    }
  };

  const handleJoin = async (data: JoinTeamValues) => {
    setJoinErrors([]);
    try {
      const res = await joinTeam.mutateAsync({
        team_code: data.joinCode.trim(),
      });
      if (!res) {
        toast.error("There was an error joining the team, please try again.");
        return;
      }
      toast.success(`Successfully joined team ${res.name}`);
      await getUserTeam.refetch();

      joinForm.reset();
    } catch (e: any) {
      const message = (e?.message as string) || "";
      if (message.includes("NOT_FOUND") || message === "NOTFOUND") {
        setJoinErrors([
          "No team was found. Make sure you have the right code.",
        ]);
      } else if (message.includes("FORBIDDEN") || message === "TEAMFULL") {
        setJoinErrors([
          "This team is full. We only allow up to 6 members per team. Would you like to create your own?",
        ]);
      } else {
        console.error(e);
        toast.error("There was something wrong, please try again.");
      }
    }
  };

  const handleLeave = async (teamId: string, teamName: string) => {
    try {
      await leaveTeam.mutateAsync({ team_id: teamId });
      toast.success(`You have left team ${teamName}`);
      await getUserTeam.refetch();
      // Form values will be updated by useEffect when getUserTeam.data changes
    } catch (err) {
      console.error(err);
      toast.error("There was something wrong, please try again.");
    }
  };

  if (getUserTeam.isLoading) {
    return (
      <div className="grid gap-6">
        <div className="h-32 w-full animate-pulse rounded-md bg-zinc-200" />
      </div>
    );
  }

  const team = getUserTeam.data;

  if (team) {
    return (
      <div className="grid gap-6">
        <div className="mt-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">Team {team.name}</Label>
        </div>
        <p className="text-xs text-zinc-500">
          You are a member of team {team.name}. You can continue with your
          application.
        </p>
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Share the code below to invite friends. Teams can have up to 6
            members.
          </p>
          <div className="flex items-center space-x-2">
            <Label>Team code:</Label>
            <span className="inline-block bg-zinc-100 p-1 px-3 font-mono text-black">
              {team.code}
            </span>
          </div>
        </div>
        <div className="mt-10 flex justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleLeave(team.id, team.name)}
            loading={leaveTeam.isPending}
          >
            Leave team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <div className="my-t-5 flex items-center gap-2">
          <Label className="font-whyte text-xl">
            Would you like to be considered as an individual or as a team?
          </Label>
        </div>
        <p className="text-xs text-zinc-500">
          You can apply as an individual. Creating or joining a team is
          optional.
        </p>
      </div>

      <Tabs
        defaultValue={tab}
        className="w-full max-w-xl py-3"
        onValueChange={(t) => setTab(t as typeof tab)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create a team</TabsTrigger>
          <TabsTrigger value="join">Join a team</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 pt-6">
          <div className="mb-10">
            <div className="mt-5 flex items-center gap-2">
              <Label className="font-whyte text-xl">New Team</Label>
            </div>
            <p className="text-xs text-zinc-500">
              Create your own team and invite your friends to join.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex max-w-xl flex-col gap-2">
              <Label htmlFor="teamName">Team name</Label>
              <p className="text-xs text-zinc-500">You can change this later</p>
              <Controller
                control={createForm.control}
                name="teamName"
                render={({ field }) => (
                  <Input
                    id="teamName"
                    placeholder="Autobots"
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        createForm.handleSubmit(handleCreate)();
                      }
                    }}
                  />
                )}
              />
              {createForm.formState.errors.teamName && (
                <p className="text-sm text-red-600">
                  {createForm.formState.errors.teamName.message}
                </p>
              )}
            </div>
            <div className="flex justify-start pt-10">
              <Button
                type="button"
                loading={createTeam.isPending}
                onClick={createForm.handleSubmit(handleCreate)}
              >
                Create team
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="join" className="max-w-xl space-y-6 pt-6">
          <div className="mb-10">
            <div className="mt-5 flex items-center gap-2">
              <Label className="font-whyte text-xl">Join a team</Label>
            </div>
            <p className="text-xs text-zinc-500">
              Ask your friends for their team code and join their team.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex max-w-xl flex-col gap-2">
              <Label htmlFor="code">Team code</Label>
              <Controller
                control={joinForm.control}
                name="joinCode"
                render={({ field }) => (
                  <Input
                    id="code"
                    placeholder="XJSY4"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        joinForm.handleSubmit(handleJoin)();
                      }
                    }}
                    data-error={
                      joinErrors.length > 0 ||
                      !!joinForm.formState.errors.joinCode
                        ? "true"
                        : undefined
                    }
                    className={cn("w-full uppercase")}
                  />
                )}
              />
              {joinForm.formState.errors.joinCode && (
                <p className="text-xs text-red-600">
                  {joinForm.formState.errors.joinCode.message}
                </p>
              )}
              {!!joinErrors.length && (
                <ul className="px-2 py-1">
                  {joinErrors.map((error) => (
                    <li key={error} className="text-xs text-red-600">
                      {error}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-start pt-10">
              <Button
                type="button"
                loading={joinTeam.isPending}
                onClick={joinForm.handleSubmit(handleJoin)}
              >
                Join team
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
