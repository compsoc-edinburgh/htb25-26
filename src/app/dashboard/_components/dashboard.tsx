"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import UserForm from "../../apply/_components/user-form";
import ApplicationForm from "../../apply/_components/application-form";
import TeamsBrowser from "./teams-browser";
import YourTeam from "./your-team";

export default function Dashboard() {
  const { isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<
    "edit-application" | "teams-browser" | "secret" | "your-team"
  >("edit-application");

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "edit-application":
        return (
          <div className="w-full divide-y divide-zinc-200">
            <UserForm />
            <ApplicationForm
              onFormSubmit={() => {
                window.location.reload();
              }}
            />
          </div>
        );
      case "teams-browser":
        return <TeamsBrowser />;
      case "secret":
        return (
          <div className="p-8">
            <p className="text-xl text-gray-500">Secret Section</p>
          </div>
        );
      case "your-team":
        return <YourTeam />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-[4.75rem] flex h-full w-full pb-40">
      <div className="flex h-full w-[10rem] flex-col items-center border-r border-zinc-200 bg-white py-28 pl-10">
        <div className="-rotate-90 transform whitespace-nowrap text-xs font-medium tracking-wider text-gray-500">
          team@hacktheburgh.com
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex border-b border-zinc-200">
          <div className="flex-1 p-8">
            <div className="mb-8">
              <div className="mb-2 flex items-center">
                <div className="mr-2 h-2 w-2 bg-black"></div>
                <span className="text-xs font-medium tracking-wider text-black">
                  MANAGE YOUR APPLICATION
                </span>
              </div>
              <h1 className="font-hexaframe text-6xl font-black tracking-tight text-black">
              {activeTab === "teams-browser" || activeTab === "your-team" ? "YOUR DASHBOARD" : "YOUR APPLICATION"}
              </h1>
            </div>
          </div>

          <div className="flex max-w-[500px] flex-1 flex-col items-stretch justify-start space-y-4">
            <div className="grid w-full grid-cols-2 overflow-hidden">
              <button
                onClick={() => setActiveTab("edit-application")}
                className={`w-full border-x border-b border-zinc-200 py-10 text-lg tracking-wider transition-colors ${
                  activeTab === "edit-application"
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                EDIT APPLICATION
              </button>
              <button
                onClick={() => setActiveTab("teams-browser")}
                className={`w-full border-b border-zinc-200 py-10 text-lg tracking-wider transition-colors ${
                  activeTab === "teams-browser"
                    ? "bg-black text-white"
                    : "text-zinc-400 hover:bg-gray-50 hover:text-black"
                }`}
              >
                TEAMS BROWSER
              </button>
              <button
                disabled
                onClick={() => setActiveTab("secret")}
                className={`w-full cursor-not-allowed border-x border-zinc-200 py-10 text-lg tracking-wider transition-colors ${
                  activeTab === "secret"
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-50"
                }`}
              >
                *Secret*
              </button>
              <button
                onClick={() => setActiveTab("your-team")}
                className={`w-full py-10 text-lg tracking-wider transition-colors ${
                  activeTab === "your-team"
                    ? "bg-black text-white"
                    : "text-zinc-400 hover:bg-gray-50 hover:text-black"
                }`}
              >
                YOUR TEAM
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">{renderTabContent()}</div>
      </div>
    </div>
  );
}
