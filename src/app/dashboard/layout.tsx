import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Navbar from "~/components/navbar";
import { api } from "~/trpc/react";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  if (!user.userId) redirect("/signin");

  return (
    <main className="flex flex-col items-center w-full">
      <Navbar isAdmin={user.sessionClaims.metadata.role === "admin"} />
      {children}
    </main>
  );
}
