import { PropsWithChildren } from "react";
import Navbar from "~/components/navbar";

export default function LandingLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
