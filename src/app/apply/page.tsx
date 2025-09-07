import { api } from "~/trpc/server";
import { currentUser } from "@clerk/nextjs/server";
import AccordionForm from "./accordion-form";
import ThankYou from "./_components/thank-you";
import RequestAuth from "~/components/layout/request-auth";

export default async function ApplicationPage() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <RequestAuth mode="signin" />;

  const user = await api.user.get();
  const application = await api.application.getUserApplication();

  if (!clerkUser?.id || !user) return <RequestAuth mode="signin" />;

  if (application) {
    return <ThankYou />;
  }

  return <AccordionForm />;
}
