"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import {
  Loader2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Search,
  Filter,
  X,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import ReactMarkdown from "react-markdown";

const MAX_TEAM_SIZE = 6;

function TeamsHeader({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  totalTeams,
  filteredCount,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: {
    teamSize: string;
    lookingForMembers: string;
  };
  setFilters: (filters: any) => void;
  totalTeams: number;
  filteredCount: number;
}) {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({
      teamSize: "all",
      lookingForMembers: "all",
    });
  };

  const hasActiveFilters =
    searchQuery ||
    filters.teamSize !== "all" ||
    filters.lookingForMembers !== "all";

  return (
    <header className="bg-white p-8 md:p-10 lg:p-12">
      <div className="mb-5">
        <h2 className="font-whyte text-xl font-bold text-black">Team Search</h2>
        <p className="mt-2 text-xs text-zinc-600">
          Discover teams that are looking for new members.{" "}
        </p>
        <div className="mt-3 rounded-md border border-[#d5d5d5] bg-[#f1f1f1] p-2 px-3">
          <p className="text-grey-700 text-xs">
            <span className="font-bold uppercase">Note:</span> Teams need 4-6
            members to submit projects on the day of the hackathon.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search teams by name or what they're looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 text-[0.63rem] md:text-sm"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {showFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {hasActiveFilters && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs"
            >
              <X className="h-3 w-3" />
              Clear all
            </Button>
            <div className="text-xs text-zinc-500">
              Showing {filteredCount} of {totalTeams} teams
            </div>
          </>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Team Size Filter */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-700">
                Team Size
              </label>
              <select
                value={filters.teamSize}
                onChange={(e) =>
                  setFilters({ ...filters, teamSize: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="all">All sizes</option>
                <option value="small">Small (1-2 members)</option>
                <option value="medium">Medium (3-4 members)</option>
                <option value="large">Large (5 members)</option>
              </select>
            </div>

            {/* Looking for Members Filter */}
            <div>
              <label className="mb-2 block text-xs font-medium text-zinc-700">
                Recruitment Status
              </label>
              <select
                value={filters.lookingForMembers}
                onChange={(e) =>
                  setFilters({ ...filters, lookingForMembers: e.target.value })
                }
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              >
                <option value="all">All teams</option>
                <option value="looking">Looking for members</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function EmptyTeamsState() {
  return (
    <div className="w-full divide-y divide-zinc-200">
      <header className="bg-white p-8 md:p-10 lg:p-12">
        <h2 className="font-whyte text-xl font-bold text-black">Team Search</h2>
        <p className="mt-2 text-xs text-zinc-600">
          Discover teams that are looking for new members
        </p>
      </header>
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
                {member.portfolio_url.includes("linkedin.com")
                  ? "View LinkedIn"
                  : "View Portfolio"}
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
  useMarkdown = false,
}: {
  title: string;
  content: string;
  subtitle?: string;
  useMarkdown?: boolean;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <div className="mr-2 h-2 w-2 bg-white" />
        <h4 className="text-xs uppercase text-zinc-300">{title}</h4>
      </div>
      {useMarkdown ? (
        <div className="prose prose-sm prose-invert mt-1 max-w-none text-white">
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-blue-400 underline hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="mb-2 text-sm" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-semibold" />
              ),
              em: ({ node, ...props }) => <em {...props} className="italic" />,
              ul: ({ node, ...props }) => (
                <ul {...props} className="mb-2 list-inside list-disc" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="mb-2 list-inside list-decimal" />
              ),
              li: ({ node, ...props }) => <li {...props} className="mb-1" />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <p className="whitespace-pre-wrap text-sm text-white">{content}</p>
      )}
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
              useMarkdown={true}
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    teamSize: "all",
    lookingForMembers: "all",
  });

  const { data: teams, isLoading } = api.team.getDiscoverableTeams.useQuery();

  // Filter teams based on search query and filters
  const filteredTeams = useMemo(() => {
    if (!teams) return [];

    return teams.filter((team: any) => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const teamName = team.name?.toLowerCase() || "";
        const lookingFor = team.teamSearch?.note?.toLowerCase() || "";
        const about = team.teamSearch?.about?.toLowerCase() || "";

        if (
          !teamName.includes(searchLower) &&
          !lookingFor.includes(searchLower) &&
          !about.includes(searchLower)
        ) {
          return false;
        }
      }

      // Team size filter
      if (filters.teamSize !== "all") {
        const memberCount = team.members?.length || 0;
        switch (filters.teamSize) {
          case "small":
            if (memberCount > 2) return false;
            break;
          case "medium":
            if (memberCount < 3 || memberCount > 4) return false;
            break;
          case "large":
            if (memberCount !== 5) return false;
            break;
        }
      }

      // Looking for members filter
      if (filters.lookingForMembers !== "all") {
        const isLookingForMembers = !!team.teamSearch?.note;
        if (filters.lookingForMembers === "looking" && !isLookingForMembers) {
          return false;
        }
      }

      return true;
    });
  }, [teams, searchQuery, filters]);

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
      <TeamsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        totalTeams={teams.length}
        filteredCount={filteredTeams.length}
      />
      <div className="bg-white">
        {filteredTeams.length === 0 ? (
          <div className="flex h-[40vh] flex-col items-center justify-center bg-white p-8 text-center">
            <p className="text-xl text-zinc-500">
              No teams match your criteria
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Try adjusting your search or filter options to see more results.
            </p>
          </div>
        ) : (
          filteredTeams.map((team: any) => (
            <TeamCard
              key={team.id}
              team={team}
              isExpanded={expandedTeamId === team.id}
              onToggle={() =>
                setExpandedTeamId(expandedTeamId === team.id ? null : team.id)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
