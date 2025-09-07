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
} from "./_steps";

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
      firstName: values.firstName,
      lastName: values.lastName,
      pronouns: values.pronouns,
      country: selectedCountry?.alpha2,
      university: values.universityName,
      universityYear: values.universityYear,
      universityEmail: values.universityEmail,
      cv: values.cvUrl || undefined,
      portfolioUrl: values.portfolioUrl || undefined,
      placementsCount: values.placementsCount,
      hackathonsCount: values.hackathonsCount,
      projectDescription: projectDescription.trim(),
      needsReimbursement: values.needsReimbursement,
      travellingFrom: values.travellingFrom || undefined,
      calendarEmail: values.calendarEmail || undefined,
    });
  };

  const sections = useMemo<SectionConfig[]>(
    () => [
      { id: "about-yourself", title: "ABOUT YOURSELF", fields: 3 },
      { id: "your-university", title: "YOUR UNIVERSITY", fields: 4 },
      { id: "your-work-experience", title: "YOUR WORK EXPERIENCE", fields: 5 },
      { id: "preferences", title: "PREFERENCES", fields: 3 },
    ],
    []
  );

  return (
    <form
      className="w-full divide-y divide-zinc-200"
      onSubmit={form.handleSubmit(submitAll)}
    >
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        return (
          <div key={section.id} className="overflow-hidden bg-white">
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
                  />
                )}
                {section.id === "your-university" && (
                  <YourUniversity
                    control={form.control}
                    register={form.register}
                    getValues={form.getValues}
                  />
                )}
                {section.id === "your-work-experience" && (
                  <YourWorkExperience
                    control={form.control}
                    register={form.register}
                  />
                )}
                {section.id === "preferences" && (
                  <Preferences
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
            className="mb-28 mt-5 h-24 w-full border border-zinc-200 bg-white text-xl uppercase text-black hover:bg-zinc-50 md:h-28 lg:h-32"
            disabled={updateUser.isPending}
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
