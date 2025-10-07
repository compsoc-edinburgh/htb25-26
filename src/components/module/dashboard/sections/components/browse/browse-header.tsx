"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Search, X } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export const TEAM_SIZE_FILTERS = {
  all: "All sizes",
  small: "Small (1–2 members)",
  medium: "Medium (3–4 members)",
  large: "Large (5 members)",
} as const;

interface TeamsHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filters: { teamSize: string; lookingForMembers: string };
  setFilters: (filters: any) => void;
  totalTeams: number;
  filteredCount: number;
}

export function BrowseHeader({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  totalTeams,
  filteredCount,
}: TeamsHeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ teamSize: "all", lookingForMembers: "all" });
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
          Discover teams that are looking for new members.
        </p>
      </div>

      <div className="mb-4 pt-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search teams by name or what they're looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 text-[0.63rem] md:text-sm"
          />
        </div>
      </div>

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

      {showFilters && (
        <div className="mt-4 space-y-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-700">
              Team Size
            </label>
            <Select
              value={filters.teamSize}
              onValueChange={(value) =>
                setFilters({ ...filters, teamSize: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All sizes" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TEAM_SIZE_FILTERS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </header>
  );
}
