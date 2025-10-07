import { type PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";
import Footer from "../../components/layout/footer";
import { api } from "~/trpc/server";
import {
  requireAuth,
  redirectNoApplication,
  redirectStatus,
} from "~/lib/routes";

export default async function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  await requireAuth();

  const application = await api.application.getUserApplication();
  if (!application) {
    redirectNoApplication();
  }
  redirectStatus(application.status);

  return (
    <main className="flex w-full flex-col items-center">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
