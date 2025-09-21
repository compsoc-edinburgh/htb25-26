"use client";

export default function TeamsBrowser() {
    return (
    <div className="flex h-full w-[98.5%] bg-gray-200 p-4">
        <div className="w-full">
          <p className="ml-2 mt-2 font-hexaframe font-bold text-4xl text-black">TEAMS</p>
  
          <div className="flex space-x-28 mt-6 ml-2">
            <ul className="space-y-0">
              <li className="p-2">Team A</li>
              <li className="p-2">Team B</li>
            </ul>
  
            <ul className="space-y-0">
              <li className="p-2">Team C</li>
            </ul>
  
            <ul className="space-y-0">
              <li className="p-2">Team D</li>
            </ul>
  
            <ul className="space-y-0">
              <li className="p-2">Team E</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
