"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Preferences, Team, YourWorkExperience } from "../_steps";
import { AccordionSection } from "./accordion";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  type ApplicationFormValues,
  ApplicationFormSchema,
} from "../_steps/types";

type ApplicationFormProps = {
  defaults?: Partial<ApplicationFormValues>;
  onFormSubmit: (values: ApplicationFormValues) => void;
};

export default function ApplicationForm({
  defaults,
  onFormSubmit,
}: ApplicationFormProps) {
  const { isSignedIn } = useUser();
  const updateUser = api.user.update.useMutation();
  const createApplication = api.application.create.useMutation();
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      teamId: undefined,
      type: "individual",
      cvUrl: undefined,
      portfolioUrl: "",
      projectAim: "",
      projectStack: "",
      projectLink: "",
      travellingFrom: "",
      placementsCount: "0",
      hackathonsCount: "0",
      needsReimbursement: false,
      ...(defaults && typeof defaults === 'object' ? defaults : {}),
    },
    mode: "all",
  });

  useEffect(() => {
    if (defaults && typeof defaults === 'object' && defaults !== null) {
      form.reset({
        teamId: undefined,
        type: "individual",
        cvUrl: undefined,
        portfolioUrl: "",
        projectAim: "",
        projectStack: "",
        projectLink: "",
        travellingFrom: "",
        placementsCount: "0",
        hackathonsCount: "0",
        needsReimbursement: false,
        ...defaults,
      });
    }
  }, [defaults, form]);

  const [expanded, setExpanded] = useState<Set<string>>(new Set([]));
  const toggle = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const errors = form.formState.errors;
  const isLoading = updateUser.isPending || createApplication.isPending;

  const hasWorkErrors =
    !!errors?.cvUrl ||
    !!errors?.portfolioUrl ||
    !!errors?.placementsCount ||
    !!errors?.hackathonsCount ||
    !!errors?.projectAim ||
    !!errors?.projectStack ||
    !!errors?.projectLink;
  const hasPreferencesErrors =
    !!errors?.needsReimbursement || !!errors?.travellingFrom;

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      const projectDescription = [
        values.projectAim?.replace(/\n/g, " ") ?? "",
        values.projectStack?.replace(/\n/g, " ") ?? "",
        values.projectLink ?? "",
      ]
        .join("\n")
        .trim();

      toast.promise(
        Promise.all([
          updateUser.mutateAsync({
            cv: values.cvUrl || undefined,
            portfolioUrl: values.portfolioUrl || undefined,
            placementsCount: values.placementsCount,
            hackathonsCount: values.hackathonsCount,
            projectDescription,
            needsReimbursement: values.needsReimbursement,
            travellingFrom:
              values.needsReimbursement === true
                ? values.travellingFrom || undefined
                : undefined,
          }),
          createApplication.mutateAsync({
            team_id: values.teamId || undefined,
            type: values.type,
          }),
        ]),
        {
          loading: "Submitting your application...",
          success: "Application submitted successfully!",
          error: "Failed to submit application. Please try again.",
        }
      );

      onFormSubmit(values);
    } catch (error) {
      console.error("Failed to submit application:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      data-form="application"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full divide-y divide-zinc-200"
    >
      <div className="flex items-center bg-white p-8 md:p-10 lg:p-12">
        <p className="mt-2 font-whyte text-xl font-bold">Application</p>
      </div>

      <AccordionSection
        id="team"
        title="YOUR TEAM"
        questionsCount={2}
        disabled={!isSignedIn || isLoading}
        expanded={expanded.has("team")}
        onToggle={toggle}
      >
        <Team
          control={form.control}
          errors={form.formState.errors}
          setValue={form.setValue}
        />
      </AccordionSection>

      <AccordionSection
        id="your-work-experience"
        title="YOUR WORK EXPERIENCE"
        questionsCount={5}
        disabled={!isSignedIn || isLoading}
        expanded={expanded.has("your-work-experience")}
        onToggle={toggle}
        invalid={hasWorkErrors}
      >
        <YourWorkExperience
          control={form.control}
          errors={form.formState.errors}
        />
      </AccordionSection>

      <AccordionSection
        id="preferences"
        title="PREFERENCES"
        questionsCount={3}
        disabled={!isSignedIn || isLoading}
        expanded={expanded.has("preferences")}
        onToggle={toggle}
        invalid={hasPreferencesErrors}
      >
        <Preferences
          errors={form.formState.errors}
          control={form.control}
          watch={form.watch}
        />
      </AccordionSection>

      <div className="h-24 bg-white p-8 px-5 pb-20 md:h-28 md:p-10 md:pb-20 lg:h-32 lg:p-12 lg:pb-20">
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!isSignedIn || isLoading || !form.formState.isValid}
            className={cn(
              "mb-28 mt-5 h-24 w-full border border-zinc-200 bg-black text-xl uppercase text-white transition-all duration-300 hover:bg-black hover:text-white md:h-28 lg:h-32",
              (isLoading || !isSignedIn || !form.formState.isValid) &&
                "cursor-not-allowed opacity-50"
            )}
          >
            {isLoading
              ? "Submitting..."
              : window.location.pathname === "/apply/edit"
                ? "Save Application"
                : "Submit Application"}
          </Button>
        </div>
      </div>
    </form>
  );
}
