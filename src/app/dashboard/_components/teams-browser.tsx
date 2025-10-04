"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Loader2, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const MAX_TEAM_SIZE = 6;

function TeamsHeader() {
  return (
    <header className="bg-white p-8 md:p-10 lg:p-12">
      <h2 className="font-whyte text-xl font-bold text-black">Team Search</h2>
      <p className="mt-2 text-xs text-zinc-600">
        Discover teams that are looking for new members
      </p>
    </header>
  );
}

function EmptyTeamsState() {
  return (
    <div className="w-full divide-y divide-zinc-200">
      <TeamsHeader />
      <div className="flex h-[40vh] flex-col items-center justify-center bg-white p-8 text-center">
        <p className="text-xl text-zinc-500">No teams found yet</p>
        <p className="mt-2 text-sm text-zinc-400">
          Once participants start searching for someone, their teams will appear
          here.
        </p>
      </div>
    </div>
  );
}

function TeamMembersList({
  members,
}: {
  members: {
    id: string;
    first_name: string;
    last_name: string;
    hackathons_count: number | null;
    placements_count: number | null;
    portfolio_url: string | null;
  }[];
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
        {members.map((member) => (
          <div key={member.id} className="bg-zinc-900 p-4">
            <div className="mb-2 text-base font-medium text-white">
              {member.first_name} {member.last_name}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
              {member.hackathons_count && (
                <div>
                  <span className="text-zinc-500">Hackathons: </span>
                  <span className="text-zinc-300">
                    {member.hackathons_count}
                  </span>
                </div>
              )}
              {member.placements_count && (
                <div>
                  <span className="text-zinc-500">Placements: </span>
                  <span className="text-zinc-300">
                    {member.placements_count}
                  </span>
                </div>
              )}
            </div>
            {member.portfolio_url && (
              <a
                href={member.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-white underline hover:no-underline"
              >
                View Portfolio
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamSection({
  title,
  content,
  subtitle,
}: {
  title: string;
  content: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <div className="mr-2 h-2 w-2 bg-white" />
        <h4 className="text-xs uppercase text-zinc-300">{title}</h4>
      </div>
      <p className="whitespace-pre-wrap text-sm text-white">{content}</p>
      {subtitle && <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>}
    </div>
  );
}

function TeamCard({
  team,
  isExpanded,
  onToggle,
}: {
  team: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border-b border-zinc-200 last:border-b-0`}>
      <div
        className={`px-8 py-8 transition-all duration-300 ease-in-out md:px-10 lg:px-12 ${
          isExpanded ? "border-b border-white bg-zinc-100" : "hover:bg-zinc-50"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={
                "mb-2 font-hexaframe text-xl font-bold text-black transition-colors duration-300 md:text-2xl"
              }
            >
              {team.name}
            </h3>

            {team.teamSearch?.note && (
              <>
                <p
                  className={
                    "text-xs font-medium uppercase tracking-wider text-zinc-400 transition-colors duration-300"
                  }
                >
                  Looking For
                </p>
                <p
                  className={
                    "mt-1 text-sm text-zinc-700 transition-colors duration-300"
                  }
                >
                  {team.teamSearch.note}
                </p>
              </>
            )}

            <button
              onClick={onToggle}
              className={
                "mt-2 flex items-center gap-1 text-xs font-medium text-black underline transition-colors duration-300 hover:no-underline"
              }
            >
              {isExpanded ? "Hide Details" : "View Details"}
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden bg-black transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`space-y-6 px-8 py-8 transition-transform duration-300 md:px-10 lg:px-12 ${
            isExpanded ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <TeamMembersList members={team.members} />

          {team.teamSearch?.about && (
            <TeamSection
              title="About the Team"
              content={team.teamSearch.about}
            />
          )}
          {team.teamSearch?.note && (
            <TeamSection title="Looking For" content={team.teamSearch.note} />
          )}
          {team.teamSearch?.contact && (
            <TeamSection
              title="Contact"
              content={team.teamSearch.contact}
              subtitle="Reach out to this contact to express your interest in joining the team"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamsBrowser() {
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const { data: teams, isLoading } = api.team.getDiscoverableTeams.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-black" />
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return <EmptyTeamsState />;
  }

  return (
    <div className="w-full divide-y divide-zinc-200">
      <TeamsHeader />
      <div className="bg-white">
        {teams.map((team: any) => (
          <TeamCard
            key={team.id}
            team={team}
            isExpanded={expandedTeamId === team.id}
            onToggle={() =>
              setExpandedTeamId(expandedTeamId === team.id ? null : team.id)
            }
          />
        ))}
      </div>
    </div>
  );
}
