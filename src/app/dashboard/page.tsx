import { auth } from "@clerk/nextjs/server";
import Dashboard from "./_components/dashboard";
import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function ApplicationPage() {
  const user = await auth();
  if (!user.userId) {
    redirect("/apply");
  }

  const application = await api.application.getUserApplication();
  if (!application) {
    redirect("/apply");
  }

  if (application.status !== "accepted") {
    redirect("/status");
  }

  return <Dashboard user={application.user} />;
}
