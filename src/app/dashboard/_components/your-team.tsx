"use client";


import { useState } from "react";

export default function YourTeam(){
        function EditField({ label, defaultValue }: { label: string; defaultValue: string }) {
            const [isEditing, setIsEditing] = useState(false);
            const [value, setValue] = useState(defaultValue);
        
            return (
              <div className="mt-6 ml-4 flex flex-col w-full">
                {/* Label + Edit button */}
                <div className="flex items-center justify-between mb-2 w-full">
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-2 bg-black"></div>
                    <span className="text-xs tracking-wider text-black">{label}</span>
                  </div>
                  <button
                    className="text-xs text-black underline hover:opacity-70 mr-4"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "SAVE" : "EDIT"}
                  </button>
                </div>
        
                {/* Content */}
                {isEditing ? (
                  <textarea
                    className="ml-6 w-[90%] p-2 text-sm text-black border border-zinc-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-black"
                    rows={3}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                ) : (
                  <p className="ml-4 text-xs uppercase font-bold text-black whitespace-pre-wrap">{value}</p>
                )}
              </div>
            );
          }
    
    return(
        <div className="flex h-full w-[62.7%] bg-gray-200 p-4 flex-col">
        <p className="ml-2 mt-2 font-hexaframe font-bold text-4xl text-black">
          TEAM UNITY
        </p>
      
        <div className="mt-6 ml-4 flex items-center">
          <div className="mr-2 h-2 w-2 bg-black"></div>
          <span className="text-xs tracking-wider text-black">
            TEAM MEMBERS
          </span>
        </div>
        <ul className="ml-6 mt-2 uppercase text-xs font-bold space-y-0">
            <li className="py-0.5 p-2">Member 1</li>
            <li className="py-0.5 p-2">Member 2</li>
            <li className="py-0.5 p-2">Member 3</li>
            <li className="py-0.5 p-2">Member 4</li>
        </ul>
        <EditField
        label="ABOUT THE TEAM"
        defaultValue="Example team description blah blah."
      />
      <EditField
        label="NOTE"
        defaultValue="We are looking for a frontend developer"
      />
      <EditField
        label="CONTACT"
        defaultValue="team.unity@example.com"
      />
      <div className="mt-8 flex space-x-4">
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold underline rounded hover:bg-zinc-200 hover:text-black transition">
            LEAVE TEAM
        </button>
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold underline rounded hover:bg-zinc-200 hover:text-black transition">
            UPLOAD TEAM PFP
        </button>
        </div>
      </div>
    );
}