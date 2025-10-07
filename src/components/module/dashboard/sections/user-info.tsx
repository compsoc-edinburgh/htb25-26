"use client";

import { type User } from "@prisma/client";
import {
  RenderLink,
  RenderYesNo,
} from "~/components/module/dashboard/sections/components/info/render-link";
import { ReactNode } from "react";
import { InfoSection } from "~/components/module/dashboard/sections/components/info/info-sections";

export default function UserInfo({ user }: { user: User }) {
  const sections = [
    {
      title: "Basic Information",
      items: [
        {
          label: "Full Name",
          value:
            `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
            undefined,
        },
        { label: "Email", value: user.email },
        { label: "Pronouns", value: user.pronouns },
        { label: "Country", value: user.country },
      ],
    },
    {
      title: "University",
      items: [
        { label: "University Name", value: user.university_name },
        { label: "Year of Study", value: user.university_year },
      ],
    },
    {
      title: "Experience",
      items: [
        { label: "Placements Completed", value: user.placements_count },
        { label: "Hackathons Attended", value: user.hackathons_count },
        { label: "CV", value: RenderLink(user.cv_url, "View CV") },
        {
          label: "Portfolio",
          value: RenderLink(user.portfolio_url, "View Portfolio"),
        },
      ],
    },
    user.project_description && {
      title: "Project Description",
      items: [{ label: "Description", value: user.project_description }],
    },
    (user.needs_reimbursement || user.travelling_from) && {
      title: "Reimbursement",
      items: [
        {
          label: "Needs Reimbursement",
          value: RenderYesNo(user.needs_reimbursement),
        },
        { label: "Travelling From", value: user.travelling_from },
      ],
    },
  ].filter(Boolean) as {
    title: string;
    items: { label: string; value?: ReactNode }[];
  }[];

  return (
    <div className="w-full divide-y divide-zinc-200">
      <header className="bg-white p-8 md:p-10 lg:p-12">
        <h2 className="font-whyte text-xl font-bold text-black">
          User Information
        </h2>
        <p className="mt-2 text-xs text-zinc-600">
          Your profile information and application details
        </p>
      </header>

      {sections.map((section, idx) => (
        <InfoSection key={idx} items={section.items} />
      ))}
    </div>
  );
}
