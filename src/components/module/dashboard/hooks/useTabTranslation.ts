import { TabKey } from "~/components/module/dashboard/hooks/useTabs";

export const useTabTranslation = () => {
  return (tab: TabKey) => {
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
};
