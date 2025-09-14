"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormPersist } from "use-react-hook-form-persist";
import { Preferences, Team, YourWorkExperience } from "../_steps";
import { AccordionSection } from "./accordion";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ApplicationFormSchema,
  type ApplicationFormValues,
} from "../_steps/types";

export default function ApplicationForm() {
  const { isSignedIn } = useUser();
  const updateUser = api.user.update.useMutation();
  const createApplication = api.application.create.useMutation();
  const router = useRouter();

  const form = useFormPersist(
    useForm<ApplicationFormValues>({
      resolver: zodResolver(ApplicationFormSchema),
      defaultValues: {
        teamId: undefined,
        type: "individual",
        cvUrl: "",
        portfolioUrl: "",
        projectAim: "",
        projectStack: "",
        projectLink: "",
        travellingFrom: "",
        calendarEmail: "",
        placementsCount: "0",
        hackathonsCount: "0",
      },
      mode: "onChange",
    }),
    { key: "apply-application-form" }
  );

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    const s = new Set(expanded);
    s.has(id) ? s.delete(id) : s.add(id);
    setExpanded(s);
  };

  const errors = form.formState.errors as any;
  const hasTeamErrors = !!errors?.teamId || !!errors?.type;
  const hasWorkErrors =
    !!errors?.cvUrl ||
    !!errors?.portfolioUrl ||
    !!errors?.placementsCount ||
    !!errors?.hackathonsCount ||
    !!errors?.projectAim ||
    !!errors?.projectStack ||
    !!errors?.projectLink;
  const hasPreferencesErrors =
    !!errors?.needsReimbursement ||
    !!errors?.travellingFrom ||
    !!errors?.calendarEmail;

  const onSubmit = async (values: ApplicationFormValues) => {
    console.log(values);
    const projectDescription = [
      values.projectAim?.replace(/\n/g, " ") ?? "",
      values.projectStack?.replace(/\n/g, " ") ?? "",
      values.projectLink ?? "",
    ].join("\n");

    await updateUser.mutateAsync({
      cv: values.cvUrl || undefined,
      portfolioUrl: values.portfolioUrl || undefined,
      placementsCount: values.placementsCount,
      hackathonsCount: values.hackathonsCount,
      projectDescription: projectDescription.trim(),
      needsReimbursement: values.needsReimbursement,
      travellingFrom: values.travellingFrom || undefined,
      calendarEmail: values.calendarEmail || undefined,
    });

    await createApplication.mutateAsync({
      team_id: values.teamId || undefined,
      type: values.type || "individual",
    });

    router.push("/dashboard");
  };

  return (
    <form
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
        disabled={!isSignedIn}
        expanded={expanded.has("team")}
        onToggle={toggle}
        invalid={hasTeamErrors}
      >
        <Team
          control={form.control as any}
          register={form.register}
          errors={form.formState.errors as any}
          setValue={form.setValue as any}
        />
      </AccordionSection>

      <AccordionSection
        id="your-work-experience"
        title="YOUR WORK EXPERIENCE"
        questionsCount={5}
        disabled={!isSignedIn}
        expanded={expanded.has("your-work-experience")}
        onToggle={toggle}
        invalid={hasWorkErrors}
      >
        <YourWorkExperience
          control={form.control as any}
          register={form.register}
          errors={form.formState.errors as any}
        />
      </AccordionSection>

      <AccordionSection
        id="preferences"
        title="PREFERENCES"
        questionsCount={3}
        disabled={!isSignedIn}
        expanded={expanded.has("preferences")}
        onToggle={toggle}
        invalid={hasPreferencesErrors}
      >
        <Preferences
          errors={form.formState.errors as any}
          control={form.control as any}
          register={form.register}
          watch={form.watch}
        />
      </AccordionSection>

      <div className="h-24 bg-white p-8 px-5 pb-20 md:h-28 md:p-10 md:pb-20 lg:h-32 lg:p-12 lg:pb-20">
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!isSignedIn || createApplication.isPending}
            className={cn(
              "mb-28 mt-5 h-24 w-full border border-zinc-200 bg-black text-xl uppercase text-white transition-all duration-300 hover:bg-black hover:text-white md:h-28 lg:h-32",
              createApplication.isPending && "cursor-not-allowed opacity-50",
              !isSignedIn && "cursor-not-allowed opacity-50"
            )}
          >
            {createApplication.isPending
              ? "Submitting..."
              : "Submit Application"}
          </Button>
        </div>
      </div>
    </form>
  );
}
