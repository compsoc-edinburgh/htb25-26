import { PropsWithChildren } from "react";
import Navbar from "~/components/layout/navbar";
import Footer from "../../components/layout/footer";

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="flex w-full flex-col items-center">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
