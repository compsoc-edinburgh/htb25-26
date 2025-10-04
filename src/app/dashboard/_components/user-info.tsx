"use client";

import { type User } from "@prisma/client";
import { ReactNode } from "react";

const InfoSection = ({
  items,
}: {
  items: {
    label: string;
    value?: ReactNode;
  }[];
}) => {
  const visibleItems = items.filter(
    (item) => item.value !== undefined && item.value !== null
  );

  if (visibleItems.length === 0) return null;

  return (
    <div className="space-y-6 border-b border-zinc-200 p-8 md:p-10 lg:p-12">
      <div className="flex flex-col gap-10">
        {visibleItems.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <p className="text-xs font-medium uppercase text-zinc-400">
              {item.label}
            </p>
            <div className="text-base text-zinc-900">
              {item.value || (
                <span className="text-zinc-400">Not provided</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderLink = (url: string | null, text = "View") =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {text}
    </a>
  ) : undefined;

const RenderYesNo = (value?: boolean | null) =>
  value == null ? undefined : value ? "Yes" : "No";

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
    user.project_description
      ? {
          title: "Project Description",
          items: [{ label: "Description", value: user.project_description }],
        }
      : null,
    user.needs_reimbursement || user.travelling_from
      ? {
          title: "Reimbursement",
          items: [
            {
              label: "Needs Reimbursement",
              value: RenderYesNo(user.needs_reimbursement),
            },
            { label: "Travelling From", value: user.travelling_from },
          ],
        }
      : null,
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
