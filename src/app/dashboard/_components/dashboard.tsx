export default function Dashboard() {
  return (
    <div className="mt-20 flex w-full border-b border-zinc-200">
      <div className="flex h-full w-40 flex-col items-center border-r border-zinc-200 bg-white py-28 pl-10">
        <div className="-rotate-90 transform whitespace-nowrap text-xs font-medium tracking-wider text-gray-500">
          HELLO@HTB.COM
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 p-8">
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
        </div>

        <div className="flex max-w-[500px] flex-1 flex-col items-stretch justify-start space-y-4 p-4">
          <div className="grid w-full grid-cols-2 divide-x divide-y divide-zinc-200 overflow-hidden border border-zinc-200">
            <button className="w-full py-10 text-lg tracking-wider text-black">
              RESUME APPLICATION
            </button>
            <button
              disabled
              aria-disabled="true"
              className="w-full cursor-not-allowed py-10 text-lg tracking-wider text-zinc-400"
            >
              TEAMS BROWSER
            </button>
            <button className="w-full py-10 text-lg tracking-wider text-black">
              *Secret*
            </button>
            <button
              disabled
              aria-disabled="true"
              className="w-full cursor-not-allowed py-10 text-lg tracking-wider text-zinc-400"
            >
              YOUR TEAM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
