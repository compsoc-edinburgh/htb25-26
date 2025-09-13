"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { countries } from "country-data-list";
import { Button } from "~/components/ui/button";
import { useFormPersist } from "use-react-hook-form-persist";

import {
  FormSchema,
  FormValues,
  SectionConfig,
  AboutYourself,
  YourUniversity,
  YourWorkExperience,
  Preferences,
  Team,
} from "./_steps";
import { useRouter } from "next/navigation";

const AccordionForm = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["about-yourself"])
  );
  const toggleSection = (sectionId: string) => {
    const s = new Set(expandedSections);
    s.has(sectionId) ? s.delete(sectionId) : s.add(sectionId);
    setExpandedSections(s);
  };

  const form = useFormPersist(
    useForm<FormValues>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        teamId: undefined,
        type: "individual",
        countryAlpha3: "GBR",
        cvUrl: "",
        portfolioUrl: "",
        projectAim: "",
        projectStack: "",
        projectLink: "",
        travellingFrom: "",
        calendarEmail: "",
      },
      mode: "onChange",
    }),
    {
      key: "apply-form",
    }
  );

  const updateUser = api.user.update.useMutation();
  const createApplication = api.application.create.useMutation();
  const router = useRouter();

  const submitAll = async (values: FormValues) => {
    const selectedCountry = countries.all.find(
      (c: any) => c.alpha3 === values.countryAlpha3
    );

    const projectDescription = [
      values.projectAim?.replace(/\n/g, " ") ?? "",
      values.projectStack?.replace(/\n/g, " ") ?? "",
      values.projectLink ?? "",
    ].join("\n");

    await updateUser.mutateAsync({
      ...values,
      country: selectedCountry?.alpha2,
      cv: values.cvUrl || undefined,
      portfolioUrl: values.portfolioUrl || undefined,
      projectDescription: projectDescription.trim(),
      travellingFrom: values.travellingFrom || undefined,
      calendarEmail: values.calendarEmail || undefined,
    });

    await createApplication.mutateAsync({
      team_id: values.teamId || undefined,
      type: values.type || "individual",
    });

    router.push("/dashboard");
  };

  const sections = useMemo<SectionConfig[]>(
    () => [
      { id: "about-yourself", title: "ABOUT YOURSELF", fields: 3 },
      { id: "team", title: "YOUR TEAM", fields: 2 },
      { id: "your-university", title: "YOUR UNIVERSITY", fields: 4 },
      { id: "your-work-experience", title: "YOUR WORK EXPERIENCE", fields: 5 },
      { id: "preferences", title: "PREFERENCES", fields: 3 },
    ],
    []
  );

  const handleErrorExpand = (errors: Record<string, unknown>) => {
    const errorKeys = new Set(Object.keys(errors ?? {}));
    const sectionsWithErrors = new Set<string>(expandedSections);
    for (const key of errorKeys) {
      if (key === "firstName" || key === "lastName" || key === "pronouns") {
        sectionsWithErrors.add("about-yourself");
      }
      if (key === "teamId" || key === "type") {
        sectionsWithErrors.add("team");
      }
      if (
        key === "countryAlpha3" ||
        key === "universityName" ||
        key === "universityYear" ||
        key === "universityEmail"
      ) {
        sectionsWithErrors.add("your-university");
      }
      if (
        key === "cvUrl" ||
        key === "portfolioUrl" ||
        key === "placementsCount" ||
        key === "hackathonsCount" ||
        key === "projectAim" ||
        key === "projectStack" ||
        key === "projectLink"
      ) {
        sectionsWithErrors.add("your-work-experience");
      }
      if (
        key === "needsReimbursement" ||
        key === "travellingFrom" ||
        key === "calendarEmail"
      ) {
        sectionsWithErrors.add("preferences");
      }
    }
    setExpandedSections(sectionsWithErrors);
  };

  console.log(FormSchema.safeParse(form.getValues()).error, form.getValues());

  return (
    <form
      className="w-full divide-y divide-zinc-200"
      onSubmit={form.handleSubmit(submitAll, handleErrorExpand)}
    >
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        return (
          <div
            key={section.id}
            className="scrollbar-hide overflow-hidden bg-white"
          >
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className={cn(
                "flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-zinc-100 md:p-10 lg:p-12",
                isExpanded && "bg-zinc-50"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col md:gap-5">
                  <span className="mb-2 flex items-center gap-2 text-xs text-zinc-600">
                    {section.fields} QUESTIONS
                  </span>
                  <h2 className="font-whyte text-2xl font-bold text-black md:text-4xl lg:text-5xl">
                    {section.title}
                  </h2>
                </div>
              </div>
              <div className="text-zinc-600">
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className="divide-y divide-zinc-200 p-8 pb-20 md:p-10 md:pb-20 lg:p-12 lg:pb-20">
                {section.id === "about-yourself" && (
                  <AboutYourself
                    control={form.control}
                    register={form.register}
                    errors={form.formState.errors}
                  />
                )}
                {section.id === "team" && (
                  <Team
                    control={form.control}
                    register={form.register}
                    errors={form.formState.errors}
                    setValue={form.setValue}
                  />
                )}
                {section.id === "your-university" && (
                  <YourUniversity
                    control={form.control}
                    register={form.register}
                    getValues={form.getValues}
                    setValue={form.setValue}
                    errors={form.formState.errors}
                  />
                )}
                {section.id === "your-work-experience" && (
                  <YourWorkExperience
                    control={form.control}
                    register={form.register}
                    errors={form.formState.errors}
                  />
                )}
                {section.id === "preferences" && (
                  <Preferences
                    errors={form.formState.errors}
                    control={form.control}
                    register={form.register}
                    watch={form.watch}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="h-24 bg-white p-8 px-5 pb-20 md:h-28 md:p-10 md:pb-20 lg:h-32 lg:p-12 lg:pb-20">
        <div className="flex justify-center">
          <Button
            type="submit"
            className={cn(
              "mb-28 mt-5 h-24 w-full border border-zinc-200 bg-black text-xl uppercase text-white transition-all duration-300 hover:bg-black hover:text-white md:h-28 lg:h-32",
              updateUser.isPending && "cursor-not-allowed opacity-50"
            )}
          >
            {updateUser.isPending ? "Submitting..." : "Submit Application"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AccordionForm;
