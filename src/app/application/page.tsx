import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import AccordionForm from "./accordion-form";

export default async function ApplicationPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/signin");
  }

  const user = await api.user.get();
  const application = await api.application.getUserApplication();

  if (!clerkUser?.id || !user) {
    redirect("/signin");
  }

  if (application) { 
    return <div>Thank you for applying!</div>
  }

  return (
    <AccordionForm />
  )
}
