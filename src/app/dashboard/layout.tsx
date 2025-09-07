import { auth } from "@clerk/nextjs/server";
import { PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";
import RequestAuth from "~/components/layout/request-auth";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();
  const isAuthed = !!user.userId;

  return (
    <main className="flex w-full flex-col items-center px-4">
      <Navbar />
      {isAuthed ? children : <RequestAuth mode="signin" />}
    </main>
  );
}
