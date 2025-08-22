import { redirect } from "next/navigation";
import { SignupForm } from "./signup-form";
import NavbarLayout from "~/components/modules/navbar-layout";

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
    <NavbarLayout className="flex items-center justify-center">
      <SignupForm />
    </NavbarLayout>
  );
}
