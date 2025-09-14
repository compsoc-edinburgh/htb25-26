import { api } from "~/trpc/server";
import AccordionForm from "./accordion-form";
import ThankYou from "./_components/thank-you";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();

  if (application) {
    return <ThankYou />;
  }

  return <AccordionForm />;
}
