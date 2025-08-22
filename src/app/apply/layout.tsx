import { PropsWithChildren } from "react";
import NavbarLayout from "~/components/modules/navbar-layout";

export default async function ApplyLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <NavbarLayout className="flex items-center justify-center">
      {children}
    </NavbarLayout>
  );
}
