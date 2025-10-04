import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { DataTable } from "./_table/data-table";
import { columns } from "./_table/columns";

export default async function AdminPage() {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    notFound();
  }

  const applications = await api.application.getApplications();

  return (
    <div className="mx-auto w-full py-10 px-10">
      <div className="mx-auto">
        <DataTable columns={columns} data={applications} />
      </div>
    </div>
  );
}
