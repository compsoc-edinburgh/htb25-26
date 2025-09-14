import { api } from "~/trpc/server";
import AccordionForm from "./accordion-form";
import ApplicationStatus from "./_components/application-status";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();

  if (application) {
    return <ApplicationStatus application={application} />;
  }

  return <AccordionForm />;
}
