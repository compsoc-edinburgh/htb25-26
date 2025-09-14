import { auth } from "@clerk/nextjs/server";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();
  const isAuthed = !!user.userId;

  return (
    <main className="flex w-full flex-col items-center px-1">
      <Navbar />
      {isAuthed ? (
        children
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      )}
    </main>
  );
}
