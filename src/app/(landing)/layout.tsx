import { type PropsWithChildren } from "react";
import Footer from "~/components/modules/footer";
import Navbar from "~/components/modules/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
