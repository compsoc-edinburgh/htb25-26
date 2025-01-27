import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import Footer from "~/components/footer";
import WebGLBackground from "~/components/gradient-background";
import Navbar from "~/components/navbar";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  const user = await auth();

  if (!user.userId) redirect("/signin");

  const application = await api.application.getUserApplication();

  return (
    <main className="flex w-full flex-col items-center px-4">
      <WebGLBackground />
      <Navbar
        isAdmin={user.sessionClaims.metadata.role === "admin"}
        application={application}
      />
      {children}
      <Footer />
    </main>
  );
}
