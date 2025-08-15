import { redirect } from "next/navigation";
import { SignupForm } from "./signup-form";

export default async function SignupPage() {
  const date = new Date();

  if (
    (date.getUTCFullYear() == 2025 &&
      (date.getUTCMonth() > 1 ||
        (date.getUTCMonth() == 1 && date.getUTCDate() > 10))) ||
    date.getUTCFullYear() > 2025
  ) {
    redirect("/applications-closed");
  }

  return (
    <div className="mt-14 flex min-h-[calc(100vh-4rem)] w-full max-w-screen-md flex-col items-center justify-center">
      <SignupForm />
    </div>
  );
}
