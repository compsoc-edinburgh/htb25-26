"use client";

import { useState, ReactNode } from "react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Loader2, Copy, Check, Edit2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import ReactMarkdown from "react-markdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type TeamMember = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  university_name: string;
  university_year: string;
};

const TeamSearchSchema = z.object({
  about: z.string().optional(),
  note: z.string().optional(),
  contact: z.string().optional(),
  status: z.enum(["discoverable", "hidden"]),
});

type TeamSearchFormValues = z.infer<typeof TeamSearchSchema>;

const JoinTeamSchema = z.object({
  teamCode: z.string().min(5, "Team code must be 5 characters").max(5),
});

type JoinTeamFormValues = z.infer<typeof JoinTeamSchema>;

export default function YourTeam() {
  const { user } = useUser();
  const [copiedCode, setCopiedCode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditingTeamInfo, setIsEditingTeamInfo] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const { data: team, isLoading, refetch } = api.team.getUserTeam.useQuery();
  const leaveTeam = api.team.leave.useMutation();
  const removeMember = api.team.removeMember.useMutation();
  const deleteTeam = api.team.deleteTeam.useMutation();
  const updateTeamSearch = api.team.updateTeamSearch.useMutation();
  const joinTeam = api.team.join.useMutation();

  const teamSearchForm = useForm<TeamSearchFormValues>({
    resolver: zodResolver(TeamSearchSchema),
    defaultValues: {
      about: "",
      note: "",
      contact: "",
      status: "hidden",
    },
  });

  const joinTeamForm = useForm<JoinTeamFormValues>({
    resolver: zodResolver(JoinTeamSchema),
    defaultValues: {
      teamCode: "",
    },
  });

  const isTeamLead = team?.created_by === user?.id;
  const members = (team?.members || []) as TeamMember[];

  const handleLeaveTeam = async () => {
    if (!team) return;

    toast.promise(
      leaveTeam.mutateAsync({ team_id: team.id }).then(() => {
        refetch();
      }),
      {
        loading: "Leaving team...",
        success: "Left team successfully",
        error: "Failed to leave team",
      }
    );
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!team) return;

    toast.promise(
      removeMember
        .mutateAsync({ team_id: team.id, user_id: memberId })
        .then(() => {
          refetch();
        }),
      {
        loading: "Removing member...",
        success: "Member removed successfully",
        error: "Failed to remove member",
      }
    );
  };

  const handleDeleteTeam = async () => {
    if (!team) return;

    toast.promise(
      deleteTeam.mutateAsync({ team_id: team.id }).then(() => {
        setDeleteDialogOpen(false);
        refetch();
      }),
      {
        loading: "Deleting team...",
        success: "Team deleted successfully",
        error: "Failed to delete team",
      }
    );
  };

  const onSubmitTeamSearch = async (data: TeamSearchFormValues) => {
    if (!team) return;

    toast.promise(
      updateTeamSearch
        .mutateAsync({
          team_id: team.id,
          ...data,
        })
        .then(() => {
          setIsEditingTeamInfo(false);
          refetch();
        }),
      {
        loading: "Saving changes...",
        success: "Team information updated successfully",
        error: "Failed to update team information",
      }
    );
  };

  const onSubmitJoinTeam = async (data: JoinTeamFormValues) => {
    toast.promise(
      joinTeam
        .mutateAsync({ team_code: data.teamCode.toUpperCase() })
        .then(() => {
          refetch();
          joinTeamForm.reset();
        }),
      {
        loading: "Joining team...",
        success: "Successfully joined team",
        error: "Failed to join team. Check the code and try again.",
      }
    );
  };

  const copyTeamCode = () => {
    if (!team) return;
    void navigator.clipboard.writeText(team.code);
    setCopiedCode(true);
    toast.success("Team code copied to clipboard!");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-black" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="w-full divide-y divide-zinc-200">
        <div className="bg-white p-8 md:p-10 lg:p-12">
          <h2 className="font-whyte text-2xl font-bold text-black">
            Join a Team
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Enter a team code to join an existing team, or create your own
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 lg:p-12">
          <form
            onSubmit={joinTeamForm.handleSubmit(onSubmitJoinTeam)}
            className="max-w-md space-y-4"
          >
            <div className="space-y-2">
              <Label
                htmlFor="teamCode"
                className="text-xs font-medium uppercase tracking-wider"
              >
                Team Code
              </Label>
              <Input
                id="teamCode"
                {...joinTeamForm.register("teamCode")}
                placeholder="XJSYY"
                className="uppercase"
                maxLength={5}
              />
              {joinTeamForm.formState.errors.teamCode && (
                <p className="text-sm text-red-600">
                  {joinTeamForm.formState.errors.teamCode.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-zinc-800"
              disabled={joinTeam.isPending}
            >
              {joinTeam.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Team"
              )}
            </Button>
          </form>

          <p className="mt-6 text-sm text-zinc-600">
            Don&#39;t have a code? Browse teams in the Teams Browser tab or
            create your own.
          </p>
        </div>
      </div>
    );
  }

  const InfoSection = ({
    title,
    items,
  }: {
    title: string;
    items: {
      label: string;
      value: string | undefined | ReactNode;
    }[];
  }) => (
    <div className="space-y-6 border-b border-zinc-200 p-8 md:p-10 lg:p-12">
      <h3 className="text-sm font-medium uppercase tracking-wider text-black">
        {title}
      </h3>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              {item.label}
            </p>
            <div className="text-base text-black">
              {item.value || (
                <span className="text-zinc-400">Not provided</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full divide-y divide-zinc-200">
      {/* Header */}
      <div className="bg-white p-8 md:p-10 lg:p-12">
        <h2 className="font-whyte text-2xl font-bold text-black">Your Team</h2>
        <p className="mt-2 text-sm text-zinc-600">
          {team.name} • {members.length}{" "}
          {members.length === 1 ? "member" : "members"}
        </p>
      </div>

      {/* Team Code */}
      <InfoSection
        title="Team Code"
        items={[
          {
            label: "Code",
            value: (
              <div className="flex items-center gap-2">
                <code className="rounded border border-black bg-zinc-50 px-3 py-1 text-sm font-bold">
                  {team.code}
                </code>
                <button
                  onClick={copyTeamCode}
                  className="rounded p-1 transition hover:bg-zinc-100"
                  title="Copy team code"
                >
                  {copiedCode ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            ),
          },
          {
            label: "Share this code",
            value: "Share this code with others to invite them to your team",
          },
        ]}
      />

      {/* Team Members */}
      <div className="space-y-6 border-b border-zinc-200 p-8 md:p-10 lg:p-12">
        <h3 className="text-sm font-medium uppercase tracking-wider text-black">
          Team Members ({members.length})
        </h3>
        <div className="space-y-2">
          {members.map((member) => {
            const isCurrentUser = member.id === user?.id;
            const isMemberLead = member.id === team.created_by;

            return (
              <div
                key={member.id}
                className="group flex items-center justify-between py-2"
              >
                <div className="flex-1">
                  <div className="text-base text-black">
                    {member.first_name} {member.last_name}
                    {isCurrentUser && " (You)"}
                    {isMemberLead && (
                      <span className="ml-2 rounded bg-black px-2 py-0.5 text-[0.6rem] font-bold uppercase text-white">
                        Lead
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500">
                    {member.email || "Email not provided"}
                  </p>
                </div>
                {isTeamLead && !isCurrentUser && (
                  <button
                    className="text-xs underline opacity-0 transition group-hover:opacity-100"
                    onClick={() => setMemberToRemove(member)}
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 border-b border-zinc-200 p-8 md:p-10 lg:p-12">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-wider text-black">
            Team Information
          </h3>
          {isTeamLead && !isEditingTeamInfo && (
            <button
              onClick={() => setIsEditingTeamInfo(true)}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-black underline hover:no-underline"
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </button>
          )}
        </div>

        <div className="rounded-md border border-[#d5d5d5] bg-[#f1f1f1] p-2 px-3">
          <p className="text-grey-700 text-xs">
            <span className="font-bold uppercase">Note:</span> Teams need 4-6
            members to submit projects on the day of the hackathon.
          </p>
        </div>

        {isEditingTeamInfo && isTeamLead ? (
          <form
            onSubmit={teamSearchForm.handleSubmit(onSubmitTeamSearch)}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label
                htmlFor="about"
                className="text-xs uppercase tracking-wider"
              >
                About the Team
              </Label>
              <textarea
                id="about"
                {...teamSearchForm.register("about")}
                rows={4}
                className="w-full rounded border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Introduce your team! Share details about your members' backgrounds, skills, and experience. Include links to portfolios, LinkedIn profiles, or GitHub accounts. Mention what technologies you work with, your team's strengths, and what makes you unique. You can use **markdown** formatting."
              />
              <p className="text-xs text-zinc-500">
                Supports markdown formatting. Use **bold**, *italic*,
                [links](url), and more.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="note"
                className="text-xs uppercase tracking-wider"
              >
                Looking For
              </Label>
              <textarea
                id="note"
                {...teamSearchForm.register("note")}
                rows={3}
                className="w-full rounded border border-zinc-300 p-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Describe what kind of team members you're seeking. Be specific about skills (e.g., 'React developer', 'UI/UX designer', 'data scientist'), experience level, or particular expertise. Mention if you're looking for specific roles or complementary skills to round out your team."
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="contact"
                className="text-xs uppercase tracking-wider"
              >
                Contact
              </Label>
              <Input
                id="contact"
                {...teamSearchForm.register("contact")}
                placeholder="Best way to reach you (e.g., Discord: @username, Email: team@example.com, Telegram: @teamlead)"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-xs uppercase tracking-wider"
              >
                Visibility
              </Label>
              <Select
                value={teamSearchForm.watch("status")}
                onValueChange={(value) =>
                  teamSearchForm.setValue(
                    "status",
                    value as "discoverable" | "hidden"
                  )
                }
                disabled={members.length >= 6}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hidden">Hidden</SelectItem>
                  <SelectItem
                    value="discoverable"
                    disabled={members.length >= 6}
                  >
                    Discoverable
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500">
                {members.length >= 6
                  ? "Your team is full (6/6 members). Full teams cannot be set to discoverable."
                  : teamSearchForm.watch("status") === "discoverable"
                    ? "Your team will be visible in the Teams Browser. That means that others can see your team information."
                    : "Your team won't appear in the Teams Browser"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-black text-white hover:bg-zinc-800"
                disabled={updateTeamSearch.isPending}
              >
                {updateTeamSearch.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditingTeamInfo(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                About the Team
              </p>
              {team.teamSearch?.about ? (
                <div className="prose prose-sm mt-1 max-w-none text-black">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-600 underline hover:text-blue-800"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p {...props} className="mb-2" />
                      ),
                      em: ({ node, ...props }) => (
                        <em {...props} className="italic" />
                      ),
                    }}
                  >
                    {team.teamSearch.about}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="mt-1 text-base text-zinc-400">
                  Introduce your team! Share details about your members'
                  backgrounds, skills, and experience. Include links to
                  portfolios, LinkedIn profiles, or GitHub accounts.
                </p>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Looking For
              </p>
              {team.teamSearch?.note ? (
                <p className="mt-1 whitespace-pre-wrap text-base text-black">
                  {team.teamSearch.note}
                </p>
              ) : (
                <p className="mt-1 text-base text-zinc-400">
                  Describe what kind of team members you're seeking. Be specific
                  about skills, experience level, or particular expertise.
                </p>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Contact
              </p>
              {team.teamSearch?.contact ? (
                <p className="mt-1 text-base text-black">
                  {team.teamSearch.contact}
                </p>
              ) : (
                <p className="mt-1 text-base italic text-zinc-400">
                  Best way to reach you (e.g., Discord: @username, Email:
                  team@example.com)
                </p>
              )}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Visibility
              </p>
              <p className="mt-1 text-base capitalize text-black">
                {team.teamSearch?.status || "hidden"}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {team.teamSearch?.status === "discoverable"
                  ? "Your team will appear in the Teams Browser for others to find"
                  : "Your team won't appear in the Teams Browser"}
              </p>
            </div>

            {members.length >= 6 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Team Status
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Your team is full (6/6 members). Full teams cannot be set to
                  discoverable.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white p-8 md:p-10 lg:p-12">
        {isTeamLead ? (
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant="destructive"
            className="uppercase"
          >
            Delete Team
          </Button>
        ) : (
          <Button
            onClick={handleLeaveTeam}
            variant="destructive"
            className="uppercase"
            disabled={leaveTeam.isPending}
          >
            {leaveTeam.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Leaving...
              </>
            ) : (
              "Leave Team"
            )}
          </Button>
        )}
      </div>

      <Dialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Team Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {memberToRemove?.first_name}{" "}
              {memberToRemove?.last_name} from the team? They will need a new
              team code to rejoin.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberToRemove(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (memberToRemove) {
                  void handleRemoveMember(memberToRemove.id);
                  setMemberToRemove(null);
                }
              }}
              disabled={removeMember.isPending}
            >
              {removeMember.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Member"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Team Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Team</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team? This action cannot be
              undone. All team members will be removed from the team.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTeam}
              disabled={deleteTeam.isPending}
            >
              {deleteTeam.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Team"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
