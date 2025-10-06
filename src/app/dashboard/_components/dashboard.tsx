"use client";

import { ReactNode, useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) => {
  const router = useRouter();

  const tabs: { key: TabKey; label: string; disabled?: boolean }[] = [
    { key: "user", label: "USER" },
    { key: "teams-browser", label: "TEAMS BROWSER" },
    { key: "secret", label: "HTB Wrapped", disabled: true },
    { key: "your-team", label: "YOUR TEAM" },
  ];

  const handleTabClick = (tabKey: TabKey) => {
    // Update state first for immediate UI feedback
    setActiveTab(tabKey);
    // Then update URL without causing a full page navigation
    window.history.replaceState(null, "", `/dashboard?tab=${tabKey}`);
  };

  return (
    <div className="grid w-full grid-cols-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => !tab.disabled && handleTabClick(tab.key)}
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
  const searchParams = useSearchParams();

  // Get initial tab from URL or default to "user"
  const getInitialTab = (): TabKey => {
    const tabFromUrl = searchParams.get("tab") as TabKey;
    const validTabs: TabKey[] = [
      "user",
      "teams-browser",
      "secret",
      "your-team",
    ];
    return validTabs.includes(tabFromUrl) ? tabFromUrl : "user";
  };

  const [activeTab, setActiveTab] = useState<TabKey>(getInitialTab());

  // Update tab when URL changes (for browser back/forward)
  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") as TabKey;
    const validTabs: TabKey[] = [
      "user",
      "teams-browser",
      "secret",
      "your-team",
    ];
    if (validTabs.includes(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, activeTab]);

  // Memoize tab configuration to prevent unnecessary re-renders
  const tabConfig: Record<TabKey, ReactNode> = useMemo(
    () => ({
      user: <UserInfo user={user} />,
      "teams-browser": <TeamsBrowser />,
      secret: (
        <div className="p-8 md:p-10 lg:p-12">
          <p className="text-xl text-gray-500">Secret Section</p>
        </div>
      ),
      "your-team": <YourTeam />,
    }),
    [user]
  );

  // Define titles and subtitles for each tab
  const getTabInfo = (tab: TabKey) => {
    switch (tab) {
      case "user":
        return {
          title: "YOUR PROFILE",
          subtitle: "PERSONAL INFORMATION",
        };
      case "teams-browser":
        return {
          title: "TEAMS BROWSER",
          subtitle: "DISCOVER & CONNECT",
        };
      case "your-team":
        return {
          title: "YOUR TEAM",
          subtitle: "TEAM MANAGEMENT",
        };
      case "secret":
        return {
          title: "HTB WRAPPED",
          subtitle: "COMING SOON",
        };
      default:
        return {
          title: "YOUR DASHBOARD",
          subtitle: "MANAGE YOUR DASHBOARD",
        };
    }
  };

  const { title, subtitle } = getTabInfo(activeTab);

  return (
    <DashboardComponent
      title={title}
      subtitle={subtitle}
      rightPanel={
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      }
    >
      <div className="w-full">
        <div className="transition-opacity duration-150 ease-in-out">
          {tabConfig[activeTab]}
        </div>
      </div>
    </DashboardComponent>
  );
}
