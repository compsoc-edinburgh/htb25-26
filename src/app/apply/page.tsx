import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import AccordionForm from "~/components/module/application/accordion-form";

export default async function ApplicationPage() {
  const application = await api.application.getUserApplication();

  if (application) {
    return redirect("/status");
  }

  return <AccordionForm />;
}
