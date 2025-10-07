import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";
import { api } from "~/trpc/server";
import { requireAuth } from "~/lib/routes";

export default async function ApplyLayout({
  children,
}: Readonly<PropsWithChildren>) {
  await requireAuth();

  const application = await api.application.getUserApplication();
  if (application) {
    redirect("/status");
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className={`w-full py-12 md:py-16 md:pl-[4.2rem] md:pr-[1.25rem]`}>
        {children}
      </div>
    </main>
  );
}
