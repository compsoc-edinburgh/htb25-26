"use client";

import NavbarLayout from "~/components/layout/navbar-layout";
import { hackathonEvents } from "~/lib/constants/schedule";
import ScheduleTimeline from "~/components/module/schedule-timeline";
import SectionHeader from "~/components/module/section-header";
import Volunteer from "~/components/module/sections/volunteer";
import FAQSection from "~/components/module/sections/faq";
import Sponsors from "~/components/module/sections/sponsors";
import Team from "~/components/module/sections/team";
import { Main } from "~/components/module/sections/main";

export default function Page() {
  return (
    <main className="h-full w-full pb-24">
      <div id="about" className="scroll-mt-24 md:scroll-mt-28 2xl:scroll-mt-40">
        <NavbarLayout className="relative h-screen py-0">
          <Main />
        </NavbarLayout>
      </div>

      <div
        id="schedule"
        className="scroll-mt-24 md:scroll-mt-28 2xl:scroll-mt-40"
      >
        <NavbarLayout>
          <SectionHeader
            title="Schedule"
            subtitle="Discover the hackathon will unfold"
            className="pb-10"
          />
          <ScheduleTimeline events={hackathonEvents} />
          <p className="absolute right-auto mt-2 flex w-fit items-center gap-2 text-center text-[0.6rem] font-thin uppercase md:right-10 2xl:hidden">
            <span className="inline-block h-1 w-1 bg-black" />
            <span>Keep scrolling to see the full schedule</span>
          </p>
        </NavbarLayout>
      </div>

      <div
        id="sponsors"
        className="scroll-mt-24 md:scroll-mt-28 2xl:scroll-mt-40"
      >
        <Sponsors />
      </div>

      <div id="team" className="scroll-mt-24 md:scroll-mt-28 2xl:scroll-mt-40">
        <NavbarLayout>
          <Team />
        </NavbarLayout>
      </div>

      <div
        id="faq"
        className={`mx-auto w-full scroll-mt-24 py-16 md:scroll-mt-28 md:py-24 md:pl-[4.2rem] md:pr-[1.25rem] 2xl:min-w-[1200px] 2xl:max-w-[1400px] 2xl:scroll-mt-40`}
      >
        <FAQSection />
      </div>

      <div
        id="volunteer"
        className="scroll-mt-24 md:scroll-mt-28 2xl:scroll-mt-40"
      >
        <NavbarLayout className="flex h-screen items-center">
          <Volunteer />
        </NavbarLayout>
      </div>
    </main>
  );
}
