"use client";

export const MAX_TEAM_SIZE = 6;

export function TeamMembersList({
  members,
}: {
  members: { id: string; first_name: string; last_name: string }[];
}) {
  return (
    <div>
      <div className="mb-4 flex items-center">
        <div className="mr-2 h-2 w-2 bg-white" />
        <h4 className="text-xs uppercase text-white">
          Team Members ({members.length}/{MAX_TEAM_SIZE})
        </h4>
      </div>
      <div className="space-y-4">
        {members.map((m) => (
          <div key={m.id} className="bg-zinc-900 p-2">
            <div className="pl-3 text-sm font-medium text-white">
              {m.first_name} {m.last_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
