import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
// import EditApplicationForm from "./form";
import DashboardClient from "./dashboardClient";

export default function ApplicationPage() {
  // const application = await api.application.getUserApplication();
  // const user = await api.user.get();

  // if (!application || !user) redirect("/apply");

  return <DashboardClient />;
  // <DashboardClient application={application} user={user} />;
}
