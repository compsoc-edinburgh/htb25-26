"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Country } from "~/components/ui/country-dropdown";
import { Team, User } from "@prisma/client";
import { University } from "~/components/ui/university-dropdown";
import { User2, Users2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CVStep from "./_steps/cv";
import UniversityYearStep from "./_steps/university-year";
import CountryStep from "./_steps/country";
import UniversityStep from "./_steps/university";
import NameStep from "./_steps/name";
import EmailStep from "./_steps/email";
import TeamStep from "./_steps/team";

import { countries } from "country-data-list";
import universities from "~/lib/constants/world_universities_and_domains.json";
import ReviewAndSubmitStep from "./_steps/review-submit";
import PortfolioStep from "./_steps/portfolio";
import PlacementsStep from "./_steps/placements";
import HackathonsStep from "./_steps/hackathons";
import ProjectStep from "./_steps/projects";
import ReimbursementStep from "./_steps/reimbursement";
import DietStep from "./_steps/diet";
import CalendarStep from "./_steps/calendar";

export type ApplicationStep =
  | "team"
  | "name"
  | "email"
  | "country"
  | "university"
  | "university-year"
  | "cv"
  | "portfolio"
  | "placements"
  | "hackathons"
  | "project"
  | "reimbursement"
  | "diet"
  | "calendar"
  | "review";

export default function ApplicationForm({
  user,
}: {
  user: User & { team: Team | null };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<ApplicationStep>(
    user.team_id ? "name" : "name",
  );

  const [applicationType, setApplicationType] = useState<
    "individual" | "team" | undefined
  >(user.team_id ? "team" : undefined);

  const [firstName, setFirstName] = useState(user.first_name ?? undefined);
  const [lastName, setLastName] = useState(user.last_name ?? undefined);
  const [email, setEmail] = useState(
    user.university_email ?? (user.email as string | undefined),
  );
  const [country, setCountry] = useState<Country | undefined>(
    countries.all.find((c) => c.alpha2 === user.country),
  );
  const [university, setUniversity] = useState<University | undefined>(
    universities.find((u) => u.name === user.university_name),
  );
  const [universityYear, setUniversityYear] = useState(
    user.university_year ?? undefined,
  );
  const [team, setTeam] = useState<Team | undefined>(user.team ?? undefined);
  const [cv, setCv] = useState(user.cv_url ?? undefined);
  const [portfolio, setPortfolio] = useState(user.portfolio_url ?? undefined);
  const [placements, setPlacements] = useState(
    user.placements_count ?? undefined,
  );
  const [hackathons, setHackathons] = useState(
    user.hackathons_count ?? undefined,
  );
  const [project, setProject] = useState(user.project_description ?? undefined);
  const [needsReimbursement, setNeedsReimbursement] = useState(
    user.needs_reimbursement ?? undefined,
  );
  const [travel, setTravel] = useState(user.travelling_from ?? undefined);
  const [diet, setDiet] = useState(user.dietary_restrictions ?? undefined);
  const [calendarEmail, setCalendarEmail] = useState(
    user.calendar_email ?? undefined,
  );

  useEffect(() => {
    if (searchParams.has("step")) {
      setStep(
        (searchParams.get("step") as typeof step) ??
          (user.team_id ? "name" : "team"),
      );
    }
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-3 py-10">
      {(step === "team" || !applicationType) && (
        <TeamStep
          team={team}
          setApplicationType={setApplicationType}
          setTeam={setTeam}
          setStep={setStep}
        />
      )}

      {!!applicationType && (
        <>
          {step !== "team" && (
            <div className="pb-10">
              {applicationType === "individual" ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-2xl font-medium">
                    <User2 /> Applying as an individual
                  </div>
                  <Button
                    variant={"outline"}
                    className="my-2 w-max rounded-2xl px-3 py-2"
                    onClick={() => {
                      setStep("team");
                      setApplicationType(undefined);
                      router.push(pathname);
                    }}
                    size={"sm"}
                  >
                    <Users2 /> Apply with a team instead
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-2xl font-medium">
                    <Users2 /> Applying with team{" "}
                    <span className="rounded-full border px-4 py-2 shadow-md">
                      {team?.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          {step === "name" && (
            <NameStep
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              setStep={setStep}
            />
          )}
          {step === "country" && (
            <CountryStep
              country={country}
              setCountry={setCountry}
              setStep={setStep}
            />
          )}
          {step === "university" && (
            <UniversityStep
              country={country!}
              university={university}
              setUniversity={setUniversity}
              setStep={setStep}
            />
          )}
          {step === "university-year" && (
            <UniversityYearStep
              universityYear={universityYear}
              setUniversityYear={setUniversityYear}
              setStep={setStep}
            />
          )}
          {step === "email" && (
            <EmailStep
              university={university}
              email={email}
              setEmail={setEmail}
              setStep={setStep}
            />
          )}
          {step === "cv" && <CVStep cv={cv} setCv={setCv} setStep={setStep} />}
          {step === "portfolio" && (
            <PortfolioStep
              portfolio={portfolio}
              setPortfolio={setPortfolio}
              setStep={setStep}
            />
          )}
          {step === "placements" && (
            <PlacementsStep
              placements={placements}
              setPlacements={setPlacements}
              setStep={setStep}
            />
          )}
          {step === "hackathons" && (
            <HackathonsStep
              hackathons={hackathons}
              setHackathons={setHackathons}
              setStep={setStep}
            />
          )}
          {step === "project" && (
            <ProjectStep
              project={project}
              setProject={setProject}
              setStep={setStep}
            />
          )}
          {step === "reimbursement" && (
            <ReimbursementStep
              needsReimbursement={needsReimbursement}
              setNeedsReimbursement={setNeedsReimbursement}
              travel={travel}
              setTravel={setTravel}
              setStep={setStep}
            />
          )}
          {step === "diet" && (
            <DietStep diet={diet} setDiet={setDiet} setStep={setStep} />
          )}
          {step === "calendar" && (
            <CalendarStep
              universityEmail={email}
              calendarEmail={calendarEmail}
              setCalendarEmail={setCalendarEmail}
              setStep={setStep}
            />
          )}
          {step === "review" && (
            <ReviewAndSubmitStep
              team={team}
              setStep={setStep}
              applicationType={applicationType}
            />
          )}
        </>
      )}
    </div>
  );
}
