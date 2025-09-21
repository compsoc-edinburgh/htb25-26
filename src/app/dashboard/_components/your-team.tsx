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
    
          const members = ["Member 1", "Member 2", "Member 3", "Member 4"];
          const [selectedMember, setSelectedMember] = useState<string | null>(null);
        
          return (
            <div className="flex h-full w-[63%] bg-gray-200 p-4 flex-col relative">
              <p className="ml-2 mt-2 font-hexaframe font-bold text-4xl text-black">
                TEAM UNITY
              </p>
        
              {/* TEAM MEMBERS */}
              <div className="mt-6 ml-4 flex items-center">
                <div className="mr-2 h-2 w-2 bg-black"></div>
                <span className="text-xs tracking-wider text-black">TEAM MEMBERS</span>
              </div>
        
              <ul className="ml-6 mt-2 text-xs uppercase space-y-1">
                {members.map((member) => (
                    <li
                    key={member}
                    className="cursor-pointer" 
                    onClick={() => setSelectedMember(member)}
                    >
                    <div className="inline-flex items-center px-2 rounded hover:bg-black hover:text-white transition group">
                        <span>{member}</span>
                        <button
                        className="ml-4 text-xs underline text-white opacity-0 group-hover:opacity-100 transition"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            alert(`Removed ${member}`);
                        }}
                        >
                        REMOVE
                        </button>
                    </div>
                    </li>
                ))}
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
      <div className="mt-8 ml-4 flex space-x-4">
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold underline rounded hover:bg-zinc-200 hover:text-black transition">
            LEAVE TEAM
        </button>
        <button className="px-4 py-2 bg-black text-white text-xs font-semibold underline rounded hover:bg-zinc-200 hover:text-black transition">
            UPLOAD TEAM PFP
        </button>
        </div>
        {selectedMember && (
      <div className="fixed top-[34%] left-[67%] h-[54%] w-[31.5%] bg-black text-white p-6 shadow-lg flex flex-col z-50">
        <button
          className="self-end mb-6 text-white underline hover:opacity-70"
          onClick={() => setSelectedMember(null)}
        >
          Close
        </button>
        <h2 className="-mt-12 text-3xl uppercase font-hexaframe font-bold">{selectedMember}</h2>
        <div className="mt-6 ml-4 flex items-center">
            <div className="mr-2 h-2 w-2 bg-white"></div>
            <span className="text-xs tracking-wider text-white">UNIVERSITY</span>
        </div>
        <div className="ml-8 mt-3 text-xs font-bold uppercase space-y-1">University of Edinburgh</div>
        <div className="mt-6 ml-4 flex items-center">
            <div className="mr-2 h-2 w-2 bg-white"></div>
            <span className="text-xs tracking-wider text-white">YEAR OF UNIVERSITY</span>
        </div>
        <div className="ml-8 mt-3 text-xs font-bold uppercase space-y-1">3rd Year</div>
        <div className="mt-6 ml-4 flex items-center">
            <div className="mr-2 h-2 w-2 bg-white"></div>
            <span className="text-xs tracking-wider text-white">BIO</span>
        </div>
        <div className="ml-8 mt-3 text-xs font-bold uppercase space-y-1">Hi. Uh. Bio goes here</div>
        <div className="mt-6 ml-4 flex items-center">
            <div className="mr-2 h-2 w-2 bg-white"></div>
            <span className="text-xs tracking-wider text-white">SOCIALS</span>
        </div>
        <div className="ml-8 mt-3 text-xs font-bold uppercase space-y-1">DISCORD | INSTA | EMAIL | CLUB PENGUIN</div>
      </div>
    )}
      </div>
    );
}