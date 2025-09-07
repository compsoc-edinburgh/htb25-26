import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  if (!user.userId) redirect("/signin");

  return (
    <main className="flex w-full flex-col items-center px-4">
      <Navbar />
      {children}
    </main>
  );
}
