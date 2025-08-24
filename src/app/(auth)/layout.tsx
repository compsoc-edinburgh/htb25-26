import { PropsWithChildren } from "react";
import Navbar from "~/components/modules/navbar";
import NavbarLayout from "~/components/modules/navbar-layout";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        {children}
      </div>
    </main>
  );
}
