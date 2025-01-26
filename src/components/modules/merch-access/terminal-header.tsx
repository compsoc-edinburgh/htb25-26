const TerminalHeader = () => (
  <div className="flex items-center gap-2 border-b px-4 py-2">
    <div className="flex gap-1.5">
      <div className="h-3 w-3 rounded-full bg-red-500/80" />
      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
      <div className="h-3 w-3 rounded-full bg-green-500/80" />
    </div>
    <span className="text-sm text-gray-400">hack_the_burgh_merch_service_terminal</span>
  </div>
)

export { TerminalHeader }