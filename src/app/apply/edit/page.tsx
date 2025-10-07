"use client";

import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ApplicationForm from "../../../components/module/application/forms/application-form";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

function parseProjectDescription(raw?: string) {
  const empty = { aim: "", stack: "", link: "" } as const;
  if (!raw) return empty;

  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length >= 3) {
    return {
      aim: lines[0] || "",
      stack: lines[1] || "",
      link: lines[2] || "",
    } as const;
  }

  const urlMatch = raw.match(/https?:\/\/\S+/);
  const link = urlMatch?.[0] ?? "";
  const remainder = urlMatch ? raw.replace(urlMatch[0], "").trim() : raw.trim();

  const separators = [" | ", " - ", " — ", " – ", " / "];
  let aim = remainder;
  let stack = "";
  for (const sep of separators) {
    if (remainder.includes(sep)) {
      const parts = remainder
        .split(sep)
        .map((x) => x.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        aim = parts[0] || "";
        stack = parts.slice(1).join(" ").trim();
      }
      break;
    }
  }

  return { aim, stack, link } as const;
}

export default function ManageApplication() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const application = api.application.getUserApplication.useQuery();
  const user = api.user.get.useQuery();

  if (!isLoaded || application.isLoading || user.isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!application.data) {
    return null;
  }

  const {
    aim: projectAim,
    stack: projectStack,
    link: projectLink,
  } = parseProjectDescription(user.data?.project_description ?? "");

  const defaults = {
    teamId: application.data?.team?.id,
    type: application.data?.team ? ("team" as const) : ("individual" as const),
    cvUrl: user.data?.cv_url ?? undefined,
    portfolioUrl: user.data?.portfolio_url ?? "",
    projectAim,
    projectStack,
    projectLink,
    travellingFrom: user.data?.travelling_from ?? "",
    calendarEmail: user.data?.calendar_email ?? "",
    placementsCount: user.data?.placements_count ?? "0",
    hackathonsCount: user.data?.hackathons_count ?? "0",
    needsReimbursement: user.data?.needs_reimbursement ?? false,
  } as const;

  return (
    <div className="mt-5 flex h-full w-full pb-40">
      <div className="flex flex-1 flex-col">
        <div className="flex border-b border-zinc-200">
          <div className="flex-1 p-8">
            <div className="mb-8">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-2 w-2 bg-black"></div>
                <span className="text-xs font-medium tracking-wider text-black">
                  MANAGE YOUR APPLICATION
                </span>
              </div>
              <h1 className="font-hexaframe text-6xl font-black tracking-tight text-black">
                EDIT YOUR APPLICATION
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full">
          <ApplicationForm
            defaults={defaults}
            onFormSubmit={() => {
              router.push("/status");
            }}
          />
        </div>
      </div>
    </div>
  );
}
