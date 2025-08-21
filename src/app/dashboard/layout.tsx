import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "~/components/modules/navbar";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  if (!user.userId) redirect("/signin");

  const application = await api.application.getUserApplication();

  return (
    <main className="flex w-full flex-col items-center px-4">
      <Navbar />
      {children}
    </main>
  );
}
