import { PropsWithChildren } from "react";
import Navbar from "~/components/modules/navbar";
import NavbarLayout from "~/components/modules/navbar-layout";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        {children}
      </div>
    </main>
  );
}
