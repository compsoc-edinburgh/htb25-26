"use client";
import { useState } from "react";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="mt-20 flex">
      <div className="flex h-full w-40 flex-col items-center border-r border-gray-200 bg-white py-28">
        <div className="-rotate-90 transform whitespace-nowrap text-xs font-medium tracking-wider text-gray-500">
          HELLO@HTB.COM
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center">
              <div className="mr-2 h-2 w-2 bg-black"></div>
              <span className="text-xs font-medium tracking-wider text-black">
                MANAGE YOUR APPLICATION
              </span>
            </div>
            <h1 className="font-hexaframe text-6xl font-black tracking-tight text-black">
              YOUR DASHBOARD
            </h1>
          </div>

          {activeTab === "teams" && (
            <div className="-ml-32 mt-20 max-h-[580px] bg-zinc-200 p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-hexaframe text-2xl text-black">
                  TEAM UNITY
                </h2>
              </div>

              <div className="mb-8">
                <div className="mb-4 flex items-center">
                  <div className="mr-2 h-2 w-2 bg-black"></div>
                  <h3 className="text-xs tracking-wider text-black">
                    TEAM MEMBERS
                  </h3>
                </div>
                <div className="space-y-1 text-sm font-medium text-black">
                  <div>KACPER SZYMANSKI</div>
                  <div>ANNA PETRUSENKO</div>
                  <div>KAMERAN RUSSEL</div>
                  <div>ALEX DAVIS</div>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 bg-black"></div>
                  <h3 className="text-xs tracking-wider">ABOUT THE TEAM</h3>
                </div>
              </div>
              <p className="mb-6 text-sm font-medium leading-relaxed">
                COMPSOCS&apos; COMMITTEE FOCUSES ON DAY-TO-DAY ORGANISATION OF
                THE SOCIETY. THE COMMITTEE HOLDS WEEKLY MEETINGS IN APPLETON
                TOWER. ELECTIONS FOR COMMITTEE ROLES HAPPEN DURING AGMS.
                CONSIDER RUNNING!
              </p>

              <div className="mb-6">
                <div className="mb-2 flex items-center">
                  <div className="mr-2 h-2 w-2 bg-black"></div>
                  <h4 className="text-xs tracking-wider">NOTE</h4>
                </div>
                <p className="text-sm font-medium">
                  WE&apos;RE LOOKING FOR A FRONTEND DEV. SHOUT US A MESSAGE IF
                  YOU&apos;RE STILL LOOKING
                </p>
              </div>

              <div className="mb-8">
                <div className="mb-2 flex items-center">
                  <div className="mr-2 h-2 w-2 bg-black"></div>
                  <h4 className="text-xs tracking-wider">CONTACT</h4>
                </div>
                <div className="text-sm font-medium underline">
                  KACPER@GMAIL.COM
                </div>
              </div>

              <div className="mb-6 flex space-x-4">
                <button className="-ml-8 bg-black px-9 py-2.5 text-sm font-bold text-white underline">
                  APPLY TO TEAM
                </button>
                <div className="flex items-center justify-between">
                  <div className="-ml-4 flex-1 bg-white py-3 text-xs text-gray-400">
                    &lt;ENTER YOUR MESSAGE AND WE&apos;LL EMAIL IT TO THEM YOUR
                    APPLICATION DETAIL/&gt;
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Grid */}
        <div className="sticky top-0 -ml-4 -mt-6 flex max-w-[500px] flex-1 flex-col items-stretch justify-start space-y-4 p-4">
          <div className="grid w-full grid-cols-2 gap-0">
            <button
              onClick={() => setActiveTab("application")}
              className="w-full border border-gray-300 py-10 text-lg tracking-wider text-black"
            >
              START APPLICATION
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className="w-full border border-gray-300 py-10 text-lg tracking-wider text-black"
            >
              TEAMS BROWSER
            </button>
            <button
              onClick={() => setActiveTab("wrapped")}
              className="w-full border border-gray-300 py-10 text-lg tracking-wider text-black"
            >
              HTB WRAPPED
            </button>
            <button
              onClick={() => setActiveTab("yourteam")}
              className="w-full border border-gray-300 py-10 text-lg tracking-wider text-black"
            >
              YOUR TEAM
            </button>
          </div>

          {/* User Profile Card */}
          {activeTab === "teams" && (
            <div className="bg-black p-6 text-white">
              <h2 className="mb-6 text-xl font-black">KAMERAN RUSSELL</h2>

              <div className="space-y-6">
                {/* University and Work Experience */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-2 w-2 bg-white"></div>
                      <h3 className="text-xs font-bold tracking-wider">
                        UNIVERSITY
                      </h3>
                    </div>
                    <p className="text-sm">UNIVERSITY OF EDINBURGH</p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-2 w-2 bg-white"></div>
                      <h3 className="text-xs font-bold tracking-wider">
                        WORK EXPERIENCE
                      </h3>
                    </div>
                    <p className="text-sm">&gt; 2 YEARS</p>
                  </div>
                </div>

                {/* Year and Resume */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-2 w-2 bg-white"></div>
                      <h3 className="text-xs font-bold tracking-wider">
                        YEAR OF UNIVERSITY
                      </h3>
                    </div>
                    <p className="text-sm">3RD YEAR</p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center">
                      <div className="mr-2 h-2 w-2 bg-white"></div>
                      <h3 className="text-xs font-bold tracking-wider">
                        RESUME/CV
                      </h3>
                    </div>
                    <p className="text-sm underline">KAMERANS_CV.PDF</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 h-2 w-2 bg-white"></div>
                    <h3 className="text-xs font-bold tracking-wider">BIO</h3>
                  </div>
                  <p className="text-sm leading-relaxed">
                    WELCOME! COMPSOC IS THE UNIVERSITY OF EDINBURGH&apos;S TECH
                    SOCIETY. OVER 25 YEARS, WE HAVE GROWN INTO THE LARGEST
                    TECHNOLOGY SOCIETY IN SCOTLAND, HOSTING EVENTS THAT ATTRACT
                    HUNDREDS OF ATTENDEES
                  </p>
                </div>

                {/* Socials */}
                <div>
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 h-2 w-2 bg-white"></div>
                    <h3 className="text-xs font-bold tracking-wider">
                      SOCIALS
                    </h3>
                  </div>
                  <div className="space-x-2 text-sm">
                    <span className="underline">DISCORD</span>
                    <span>|</span>
                    <span className="underline">INSTA</span>
                    <span>|</span>
                    <span className="underline">EMAIL</span>
                    <span>|</span>
                    <span className="underline">CLUB PENGUIN</span>
                  </div>
                </div>
              </div>

              {/* Bottom right corner elements */}
              <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                <div className="h-6 w-6 border border-white"></div>
                <div className="h-6 w-6 bg-white"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
