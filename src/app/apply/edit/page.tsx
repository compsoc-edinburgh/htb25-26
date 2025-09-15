"use client";

import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import ApplicationForm from "../_components/application-form";
import { api } from "~/trpc/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageApplication() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const application = api.application.getUserApplication.useQuery();
  const user = api.user.get.useQuery();

  useEffect(() => {
    if (!application.isLoading && !application.data) {
      router.push("/apply");
    }
  }, [application.isLoading, application.data, router]);

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

  const projectDescriptionParts =
    user.data?.project_description?.split("\n") ?? [];
  const projectAim = projectDescriptionParts[0]?.trim() ?? "";
  const projectStack = projectDescriptionParts[1]?.trim() ?? "";
  const projectLink = projectDescriptionParts[2]?.trim() ?? "";

  const defaults = {
    teamId: application.data.team?.id,
    type: application.data.team ? ("team" as const) : ("individual" as const),
    cvUrl: user.data?.cv_url ?? undefined,
    portfolioUrl: user.data?.portfolio_url ?? "",
    projectAim,
    projectStack,
    projectLink,
    travellingFrom: user.data?.travelling_from ?? "",
    calendarEmail: user.data?.calendar_email ?? "",
    placementsCount: user.data?.placements_count ?? "0",
    hackathonsCount: user.data?.hackathons_count ?? "0",
    needsReimbursement: user.data?.needs_reimbursement as boolean | undefined,
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
