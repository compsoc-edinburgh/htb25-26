import Dashboard from "./_components/dashboard";
import { redirect } from "next/navigation";

export default async function ApplicationPage() {
  redirect("/apply");

  return <Dashboard />;
}
