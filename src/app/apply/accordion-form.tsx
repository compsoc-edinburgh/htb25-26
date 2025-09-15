"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import UserForm from "./_components/user-form";
import ApplicationForm from "./_components/application-form";
import { api } from "~/trpc/react";

export default function AccordionForm() {
  const { isLoaded } = useUser();
  const router = useRouter();
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const applicationQuery = api.application.getUserApplication.useQuery(
    undefined,
    {
      enabled: applicationSubmitted,
    }
  );

  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  const handleFormSubmit = async () => {
    setApplicationSubmitted(true);
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <div className="w-full divide-y divide-zinc-200">
      <UserForm />
      <ApplicationForm onFormSubmit={handleFormSubmit} />
    </div>
  );
}
