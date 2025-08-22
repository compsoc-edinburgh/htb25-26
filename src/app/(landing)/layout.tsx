import { type PropsWithChildren } from "react";
import Navbar from "~/components/modules/navbar";

export default async function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
