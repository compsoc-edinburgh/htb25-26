"use client";

import { ReactNode, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export type TabKey = "user" | "teams-browser" | "secret" | "your-team";

interface UseTabsConfig {
  user: ReactNode;
  "teams-browser": ReactNode;
  secret: ReactNode;
  "your-team": ReactNode;
}

export function useTabs(config: UseTabsConfig) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const validTabs = useMemo(
    () => ["user", "teams-browser", "secret", "your-team"],
    []
  );

  const getInitialTab = (): TabKey => {
    const tabFromUrl = searchParams.get("tab") as TabKey;
    return validTabs.includes(tabFromUrl) ? tabFromUrl : "user";
  };

  const [activeTab, setActiveTabState] = useState<TabKey>(getInitialTab);

  const setActiveTab = (tab: TabKey) => {
    setActiveTabState(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    router.replace(`?${params.toString()}`);
  };

  const tabConfig = useMemo(() => config, [config]);

  return { activeTab, setActiveTab, tabConfig, validTabs };
}
