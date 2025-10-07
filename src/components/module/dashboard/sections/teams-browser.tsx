"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";
import { BrowseEmptyState } from "~/components/module/dashboard/sections/components/browse/browse-empty-state";
import { BrowseHeader } from "~/components/module/dashboard/sections/components/browse/browse-header";
import { BrowserCard } from "~/components/module/dashboard/sections/components/browse/browser-card";

export default function TeamsBrowser() {
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    teamSize: "all",
    lookingForMembers: "all",
  });

  const { data: teams, isLoading } = api.team.getDiscoverableTeams.useQuery();

  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    return teams.filter((team: any) => {
      const searchLower = searchQuery.toLowerCase();

      if (searchQuery) {
        const text = [team.name, team.teamSearch?.note, team.teamSearch?.about]
          .join(" ")
          .toLowerCase();
        if (!text.includes(searchLower)) return false;
      }

      const memberCount = team.members?.length || 0;
      if (filters.teamSize === "small" && memberCount > 2) return false;
      if (filters.teamSize === "medium" && (memberCount < 3 || memberCount > 4))
        return false;
      return !(filters.teamSize === "large" && memberCount !== 5);
    });
  }, [teams, searchQuery, filters]);

  if (isLoading)
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-black" />
      </div>
    );

  if (!teams || teams.length === 0) return <BrowseEmptyState />;

  return (
    <div className="w-full divide-y divide-zinc-200">
      <BrowseHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        totalTeams={teams.length}
        filteredCount={filteredTeams.length}
      />
      <div className="bg-white">
        {filteredTeams.length === 0 ? (
          <BrowseEmptyState />
        ) : (
          filteredTeams.map((team: any) => (
            <BrowserCard
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
