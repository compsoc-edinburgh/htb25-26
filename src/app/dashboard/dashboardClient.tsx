"use client";
import { useState } from "react";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="flex mt-20">
        <div className="w-40 h-full bg-white border-r border-gray-200 flex flex-col items-center py-28"> 
            <div className="transform -rotate-90 text-xs font-medium text-gray-500 tracking-wider whitespace-nowrap"> 
            HELLO@HTB.COM 
            </div> 
        </div>
      <div className="flex-1 flex">
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-black mr-2"></div>
              <span className="text-xs font-medium text-black tracking-wider">MANAGE YOUR APPLICATION</span>
            </div>
            <h1 className="text-6xl font-black font-hexaframe text-black tracking-tight">YOUR DASHBOARD</h1>
          </div>

          {activeTab === "teams" && (
            <div className="bg-zinc-200 p-8 mt-20 -ml-32 max-h-[580px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-hexaframe text-black">TEAM UNITY</h2>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-black mr-2"></div>
                  <h3 className="text-xs text-black tracking-wider">TEAM MEMBERS</h3>
                </div>
                <div className="space-y-1 text-sm font-medium text-black">
                  <div>KACPER SZYMANSKI</div>
                  <div>ANNA PETRUSENKO</div>
                  <div>KAMERAN RUSSEL</div>
                  <div>ALEX DAVIS</div>
                </div>
              </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-black mr-2"></div>
                    <h3 className="text-xs tracking-wider">ABOUT THE TEAM</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6 font-medium">
                  COMPSOC'S COMMITTEE FOCUSES ON DAY-TO-DAY ORGANISATION OF THE SOCIETY. THE COMMITTEE HOLDS WEEKLY 
                  MEETINGS IN APPLETON TOWER. ELECTIONS FOR COMMITTEE ROLES HAPPEN DURING AGMS. CONSIDER RUNNING!
                </p>

                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-black mr-2"></div>
                    <h4 className="text-xs tracking-wider">NOTE</h4>
                  </div>
                  <p className="text-sm font-medium">WE'RE LOOKING FOR A FRONTEND DEV. SHOUT US A MESSAGE IF YOU'RE STILL LOOKING</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 bg-black mr-2"></div>
                    <h4 className="text-xs tracking-wider">CONTACT</h4>
                  </div>
                  <div className="text-sm underline font-medium">KACPER@GMAIL.COM</div>
                </div>

                <div className="flex space-x-4 mb-6">
                  <button className="bg-black text-white underline px-9 py-2.5 text-sm font-bold -ml-8">
                    APPLY TO TEAM
                  </button>
                  <div className="flex items-center justify-between">
                  <div className="bg-white py-3 text-xs text-gray-400 -ml-4 flex-1">
                    &lt;ENTER YOUR MESSAGE AND WE'LL EMAIL IT TO THEM YOUR APPLICATION DETAIL/&gt;
                  </div>
                </div>
                </div>
              </div>
          )}
        </div>

        {/* Right Grid */}
        <div className="flex-1 max-w-[500px] p-4 flex flex-col justify-start items-stretch space-y-4 sticky top-0 -mt-6 -ml-4">
            <div className="grid grid-cols-2 gap-0 w-full">
            <button
              onClick={() => setActiveTab("application")}
              className="w-full border border-gray-300 text-black py-10 text-lg tracking-wider"
            >
              START APPLICATION
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className="w-full border border-gray-300 text-black py-10 text-lg tracking-wider"
            >
              TEAMS BROWSER
            </button>
            <button
              onClick={() => setActiveTab("wrapped")}
              className="w-full border border-gray-300 text-black py-10 text-lg tracking-wider"
            >
              HTB WRAPPED
            </button>
            <button
              onClick={() => setActiveTab("yourteam")}
              className="w-full border border-gray-300 text-black py-10 text-lg tracking-wider"
            >
              YOUR TEAM
            </button>
          </div>

          {/* User Profile Card */}
          {activeTab === "teams" && (
            <div className="bg-black text-white p-6">
            <h2 className="text-xl font-black mb-6">KAMERAN RUSSELL</h2>
            
            <div className="space-y-6">
              {/* University and Work Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-white mr-2"></div>
                    <h3 className="text-xs font-bold tracking-wider">UNIVERSITY</h3>
                  </div>
                  <p className="text-sm">UNIVERSITY OF EDINBURGH</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-white mr-2"></div>
                    <h3 className="text-xs font-bold tracking-wider">WORK EXPERIENCE</h3>
                  </div>
                  <p className="text-sm">&gt; 2 YEARS</p>
                </div>
              </div>
          
              {/* Year and Resume */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-white mr-2"></div>
                    <h3 className="text-xs font-bold tracking-wider">YEAR OF UNIVERSITY</h3>
                  </div>
                  <p className="text-sm">3RD YEAR</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-white mr-2"></div>
                    <h3 className="text-xs font-bold tracking-wider">RESUME/CV</h3>
                  </div>
                  <p className="text-sm underline">KAMERANS_CV.PDF</p>
                </div>
              </div>
          
              {/* Bio */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-white mr-2"></div>
                  <h3 className="text-xs font-bold tracking-wider">BIO</h3>
                </div>
                <p className="text-sm leading-relaxed">
                  WELCOME! COMPSOC IS THE UNIVERSITY OF EDINBURGH'S TECH SOCIETY. 
                  OVER 25 YEARS, WE HAVE GROWN INTO THE LARGEST TECHNOLOGY SOCIETY IN SCOTLAND, 
                  HOSTING EVENTS THAT ATTRACT HUNDREDS OF ATTENDEES
                </p>
              </div>
          
              {/* Socials */}
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-white mr-2"></div>
                  <h3 className="text-xs font-bold tracking-wider">SOCIALS</h3>
                </div>
                <div className="text-sm space-x-2">
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
              <div className="w-6 h-6 border border-white"></div>
              <div className="w-6 h-6 bg-white"></div>
            </div>
          </div>          
          )}
        </div>
      </div>
    </div>
  );
}
