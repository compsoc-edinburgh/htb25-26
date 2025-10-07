"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { TeamMembersList } from "~/components/module/dashboard/sections/components/browse/browse-member-list";
import { BrowseSection } from "~/components/module/dashboard/sections/components/browse/browse-sections";

export function BrowserCard({
  team,
  isExpanded,
  onToggle,
}: {
  team: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-200 last:border-b-0">
      <div
        className={`px-8 py-8 transition-all duration-300 ease-in-out md:px-10 lg:px-12 ${
          isExpanded ? "border-b border-white bg-zinc-100" : "hover:bg-zinc-50"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 font-hexaframe text-xl font-bold text-black md:text-2xl">
              {team.name}
            </h3>

            {team.teamSearch?.note && (
              <>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Looking For
                </p>
                <p className="mt-1 text-sm text-zinc-700">
                  {team.teamSearch.note}
                </p>
              </>
            )}

            <button
              onClick={onToggle}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-black underline hover:no-underline"
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

      {isExpanded && (
        <div className="overflow-hidden bg-black transition-all duration-300 ease-in-out">
          <div className="space-y-6 px-8 py-8 md:px-10 lg:px-12">
            <TeamMembersList members={team.members} />
            {team.teamSearch?.about && (
              <BrowseSection
                title="About the Team"
                content={team.teamSearch.about}
                useMarkdown
              />
            )}
            {team.teamSearch?.note && (
              <BrowseSection
                title="Looking For"
                content={team.teamSearch.note}
              />
            )}
            {team.teamSearch?.contact && (
              <BrowseSection
                title="Contact"
                content={team.teamSearch.contact}
                subtitle="Reach out to express interest in joining."
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
