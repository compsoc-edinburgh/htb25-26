import type React from "react";
import {
  GROUPED_STEPS,
  ApplicationStep,
  APPLICATION_STEPS,
} from "./application-form";
import { Team } from "@prisma/client";
import { Users2 } from "lucide-react";

export default function ApplicationHeader({
  applicationType,
  currentStep,
  team,
}: {
  applicationType: "individual" | "team" | undefined;
  currentStep: ApplicationStep;
  team?: Team;
}) {
  const currentStepIndex = APPLICATION_STEPS.indexOf(currentStep);
  const currentGroupIndex = GROUPED_STEPS.findIndex((group) =>
    group.steps.includes(currentStep),
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      <div className="flex gap-2">
        {GROUPED_STEPS.map((group, index) => {
          const start = APPLICATION_STEPS.indexOf(group.steps[0] as string);

          const progress =
            Math.min(
              Math.max(currentStepIndex + 1 - start, 0),
              group.steps.length,
            ) / group.steps.length;

          return (
            <div className="flex-1" key={group.group}>
              <div
                className={`h-1 overflow-hidden rounded-full bg-muted-foreground/40 transition-all duration-300`}
              >
                <div
                  className="h-full bg-primary transition-[width] duration-300"
                  style={{ width: `${progress * 100}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {currentStep !== "done" && (
        <>
          {currentStep !== "team" && applicationType === "team" && team && (
            <span className="flex items-center gap-2 text-xs">
              <Users2 size={12} />
              Applying with team {team.name}
            </span>
          )}

          <div className="flex w-full flex-col gap-2 rounded-xl bg-accent-yellow px-4 py-3 text-black">
            <span className="flex items-center gap-3">
              <span className="text-xs">
                {currentGroupIndex + 1} / {GROUPED_STEPS.length}
              </span>
              <span className="text-sm">
                {GROUPED_STEPS[currentGroupIndex]?.group}
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
