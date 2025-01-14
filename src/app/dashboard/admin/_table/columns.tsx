"use client";

import { ApplicationStatus, Team, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

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
  },
  {
    accessorKey: "user.first_name",
    header: "First Name",
  },
  {
    accessorKey: "user.last_name",
    header: "Last Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    accessorFn: (value) =>
      value.status.charAt(0).toUpperCase() + value.status.slice(1),
  },
  {
    accessorKey: "user.cv_url",
    header: "CV",
    cell: (value) => (
      <a
        href={value.cell.getValue() as string}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline"
      >
        View
      </a>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Applied at",
    accessorFn: (value) => value.created_at.toLocaleDateString(),
  },
  {
    accessorKey: "user.country",
    header: "Country",
  },
  {
    accessorKey: "user.university_name",
    header: "University",
  },
  {
    accessorKey: "user.university_email",
    header: "University Email",
  },
  {
    accessorKey: "user.university_year",
    header: "University Year",
  },
  {
    accessorKey: "team.name",
    header: "Team Name",
  },
  {
    accessorKey: "team.code",
    header: "Team Code",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
