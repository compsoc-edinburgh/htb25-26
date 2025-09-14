"use client";

import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import UserForm from "./_components/user-form";
import ApplicationForm from "./_components/application-form";

export default function AccordionForm() {
  const { isLoaded } = useUser();
  if (!isLoaded) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full divide-y divide-zinc-200">
      <UserForm />
      <ApplicationForm />
    </div>
  );
}
