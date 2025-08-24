import { type PropsWithChildren } from "react";
import Navbar from "~/components/modules/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <main className="flex h-screen flex-col items-center">
      <Navbar />
      {children}
    </main>
  );
}
