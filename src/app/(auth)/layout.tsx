import { PropsWithChildren } from "react";
import Navbar from "~/components/navbar";

export default function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <main className="flex flex-col items-center px-4 pt-16">
      <Navbar />
      {children}
    </main>
  );
}
