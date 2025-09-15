import { api } from "~/trpc/server";
import AccordionForm from "./accordion-form";
import { redirect } from "next/navigation";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();

  if (application) {
    return redirect("/status");
  }

  return <AccordionForm />;
}
