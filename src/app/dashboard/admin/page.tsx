import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { DataTable } from "./_table/data-table";
import { columns } from "./_table/columns";

export default async function AdminPage() {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata.role !== "admin") {
    notFound();
  }

  const applications = await api.application.getApplications();

  return (
    <div className="mx-auto w-full max-w-screen-md py-20">
      <h1 className="text-center text-2xl font-bold">Manage applications</h1>
      <div className="mx-auto my-10">
        <DataTable columns={columns} data={applications} />
      </div>
    </div>
  );
}
