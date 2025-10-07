import Dashboard from "../../components/module/dashboard/dashboard";
import { api } from "~/trpc/server";

export default async function DashboardPage() {
  const application = await api.application.getUserApplication();

  return <Dashboard user={application!.user} />;
}
