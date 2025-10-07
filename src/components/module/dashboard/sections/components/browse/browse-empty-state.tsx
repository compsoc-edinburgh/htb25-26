"use client";

export function BrowseEmptyState() {
  return (
    <div className="w-full divide-y divide-zinc-200">
      <header className="bg-white p-8 md:p-10 lg:p-12">
        <h2 className="font-whyte text-xl font-bold text-black">Team Search</h2>
        <p className="mt-2 text-xs text-zinc-600">
          Discover teams that are looking for new members
        </p>
      </header>
      <div className="flex h-[40vh] flex-col items-center justify-center bg-white p-8 text-center">
        <p className="text-xl text-zinc-500">No teams found yet</p>
        <p className="mt-2 text-sm text-zinc-400">
          Once participants start searching for someone, their teams will appear
          here.
        </p>
      </div>
    </div>
  );
}
