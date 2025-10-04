"use client";

import { ApplicationStatus, Team, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";

export type Application = {
  id: string;
  status: ApplicationStatus;
  user: User;
  team: Team | null;
  created_at: Date;
};

export const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 40,
  },
  {
    accessorKey: "user.first_name",
    header: "First Name",
    cell: ({ row }) => (
      <div className="whitespace-nowrap font-medium text-black">
        {row.original.user.first_name}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "user.last_name",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="whitespace-nowrap font-medium text-black">
        {row.original.user.last_name}
      </div>
    ),
    size: 120,
  },
  {
    accessorKey: "user.cv_url",
    header: "CV",
    cell: ({ row }) => {
      const cvUrl = row.original.user.cv_url;
      return cvUrl ? (
        <a
          href={cvUrl}
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap text-blue-500 underline transition-opacity hover:opacity-70"
        >
          View CV
        </a>
      ) : (
        <span className="text-neutral-400">—</span>
      );
    },
    size: 80,
  },
  {
    accessorKey: "created_at",
    header: "Applied",
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-xs text-neutral-600">
        {row.original.created_at.toLocaleDateString("en-GB")}
      </div>
    ),
    size: 90,
  },
  {
    accessorKey: "user.country",
    header: "Country",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.original.user.country || "—"}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "user.university_name",
    header: "University",
    cell: ({ row }) => (
      <div className="min-w-[200px] leading-tight">
        {row.original.user.university_name || "—"}
      </div>
    ),
    size: 250,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => (
      <div className="min-w-[180px] font-mono text-xs">
        {row.original.user.email || "—"}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "user.university_year",
    header: "Year",
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-center">
        {row.original.user.university_year || "—"}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: "team.name",
    header: "Team Name",
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        {row.original.team?.name || (
          <span className="italic text-neutral-400">No team</span>
        )}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "team.code",
    header: "Team Code",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.original.team?.code || "—"}</div>
    ),
    size: 100,
  },
  {
    accessorKey: "user.placements_count",
    header: "Placements",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.user.placements_count ?? "—"}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "user.hackathons_count",
    header: "Hackathons",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.user.hackathons_count ?? "—"}
      </div>
    ),
    size: 100,
  },
  {
    accessorKey: "user.project_description",
    header: "Project Description",
    cell: ({ row }) => (
      <div className="min-w-[300px] max-w-[400px] py-1 leading-relaxed">
        {row.original.user.project_description ? (
          <div className="text-sm">{row.original.user.project_description}</div>
        ) : (
          <span className="italic text-neutral-400">No description</span>
        )}
      </div>
    ),
    size: 350,
  },
  {
    accessorKey: "user.needs_reimbursement",
    header: "Reimbursement",
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.user.needs_reimbursement ? "Yes" : "No"}
      </div>
    ),
    size: 110,
  },
  {
    accessorKey: "user.travelling_from",
    header: "Travel From",
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        {row.original.user.travelling_from || "—"}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "user.dietary_restrictions",
    header: "Dietary Requirements",
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        {row.original.user.dietary_restrictions || (
          <span className="text-neutral-400">None</span>
        )}
      </div>
    ),
    size: 180,
  },
];
