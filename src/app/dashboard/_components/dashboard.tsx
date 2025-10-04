"use client";

import { ReactNode, useState } from "react";
import { type User } from "@prisma/client";
import TeamsBrowser from "./teams-browser";
import YourTeam from "./your-team";
import UserInfo from "./user-info";
import { cn } from "../../../lib/utils";

type TabKey = "user" | "teams-browser" | "secret" | "your-team";

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
              <span className="text-xs font-medium tracking-wider text-black">
                {subtitle}
              </span>
            </div>
            <h1 className="font-hexaframe text-4xl font-black tracking-tight text-black md:text-5xl lg:text-6xl">
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
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) => {
  const tabs: { key: TabKey; label: string; disabled?: boolean }[] = [
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
            "w-full border-b border-zinc-200 py-8 text-sm tracking-wider transition-colors md:py-10 md:text-base lg:text-lg",
            {
              "bg-black text-white": activeTab === tab.key,
              "text-black hover:bg-gray-50":
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

export default function Dashboard({ user }: { user: User }) {
  const [activeTab, setActiveTab] = useState<TabKey>("user");

  const tabConfig: Record<TabKey, ReactNode> = {
    user: <UserInfo user={user} />,
    "teams-browser": <TeamsBrowser />,
    secret: (
      <div className="p-8 md:p-10 lg:p-12">
        <p className="text-xl text-gray-500">Secret Section</p>
      </div>
    ),
    "your-team": <YourTeam />,
  };

  const isProfileView = activeTab === "user";
  const title = isProfileView ? "YOUR PROFILE" : "YOUR DASHBOARD";
  const subtitle = isProfileView ? "YOUR PROFILE" : "MANAGE YOUR DASHBOARD";

  return (
    <DashboardComponent
      title={title}
      subtitle={subtitle}
      rightPanel={
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      }
    >
      {tabConfig[activeTab]}
    </DashboardComponent>
  );
}
