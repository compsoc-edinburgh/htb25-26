import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();

  if (application) {
    return redirect("/status");
  }

  return redirect("/applications-closed");
}
