import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import AccordionForm from "./accordion-form";
import ThankYou from "./_components/thank-you";

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
    return <ThankYou />
  }

  return (
    <AccordionForm />
  )
}
