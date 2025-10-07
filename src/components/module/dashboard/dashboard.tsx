"use client";

import { ReactNode } from "react";
import TeamsBrowser from "./sections/teams-browser";
import YourTeam from "./sections/your-team";
import UserInfo from "./sections/user-info";
import { cn } from "~/lib/utils";
import { useTabTranslation } from "~/components/module/dashboard/hooks/useTabTranslation";
import { useTabs } from "~/components/module/dashboard/hooks/useTabs";
import { HtbWrapped } from "~/components/module/dashboard/sections/htb-wrapped";
import InfoDialog from "./info-dialog";

const DashboardComponent = ({
  title,
  subtitle,
  rightPanel,
  children,
}: {
  title: string;
  subtitle: string;
  rightPanel?: ReactNode;
  children: ReactNode;
}) => (
  <div className="mt-[4.75rem] flex h-full w-full pb-40 md:pl-10 md:pr-5 lg:pl-[4.8rem]">
    <div className="flex w-full flex-1 flex-col">
      <div className="flex flex-col border-b border-zinc-200 lg:flex-row">
        <div className="flex-1 p-8 md:p-10 lg:p-12">
          <div className="mb-8">
            <div className="mb-2 flex items-center">
              <span className="flex items-center gap-1.5 text-[0.6rem] font-normal tracking-wider text-black">
                <span className="inline-block h-1.5 w-1.5 bg-black"></span>{" "}
                {subtitle}
              </span>
            </div>
            <h1 className="pt-2 font-whyte text-4xl font-black tracking-tight text-black">
              {title}
            </h1>
          </div>
        </div>
        {rightPanel && (
          <div className="flex w-full flex-col items-stretch justify-start lg:max-w-[500px] lg:flex-1">
            {rightPanel}
          </div>
        )}
      </div>

      <div className="w-full">{children}</div>
    </div>
  </div>
);

const DashboardTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}) => {
  const tabs = [
    { key: "user", label: "USER" },
    { key: "teams-browser", label: "TEAMS BROWSER" },
    { key: "secret", label: "HTB Wrapped", disabled: true },
    { key: "your-team", label: "YOUR TEAM" },
  ];

  return (
    <div className="grid w-full grid-cols-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => !tab.disabled && setActiveTab(tab.key)}
          disabled={tab.disabled}
          className={cn(
            "w-full border-b border-zinc-200 py-8 text-sm uppercase tracking-wider transition-all duration-200 ease-in-out md:py-10 md:text-base lg:text-sm",
            {
              "bg-black text-white": activeTab === tab.key,
              "text-black hover:bg-gray-50 hover:underline":
                !tab.disabled && activeTab !== tab.key,
              "cursor-not-allowed bg-zinc-100 text-zinc-500": tab.disabled,
              "lg:border-x": tab.key === "user" || tab.key === "secret",
            }
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default function Dashboard({ user }: { user: any }) {
  const { activeTab, setActiveTab, tabConfig } = useTabs({
    user: <UserInfo user={user} />,
    "teams-browser": <TeamsBrowser />,
    secret: <HtbWrapped />,
    "your-team": <YourTeam />,
  });

  const translation = useTabTranslation();
  const { title, subtitle } = translation(activeTab);

  return (
    <>
      <InfoDialog user={user} />
      <DashboardComponent
        title={title}
        subtitle={subtitle}
        rightPanel={
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        }
      >
        <div className="transition-opacity duration-150 ease-in-out">
          {tabConfig[activeTab]}
        </div>
      </DashboardComponent>
    </>
  );
}
